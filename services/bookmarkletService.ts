import { SWIPES_HASH_KEY, TRACKER_WINDOW_NAME } from "@/constants/import";
import { GREYTHR_ATTENDANCE_URL } from "@/constants/links";

const BOOKMARKLET_SOURCE = String.raw`(function () {
  var APP_URL = __APP_URL__;
  var ATTENDANCE_URL = __ATTENDANCE_URL__;
  var WINDOW_NAME = __WINDOW_NAME__;
  var HASH_KEY = __HASH_KEY__;
  var TIME_PATTERN = /\b\d{1,2}:\d{2}:\d{2}\s*[ap]m\b/gi;
  var DATE_PATTERN = /\b\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}\b/g;
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var CLICK_AGAIN = "Opening Attendance Info in GreytHR. Once your swipes page has loaded (log in first if asked), click Zentek Import again.";

  var attendance = new URL(ATTENDANCE_URL);
  var attendancePath = attendance.pathname.replace(/\/+$/, "");

  if (location.host !== attendance.host) {
    alert(CLICK_AGAIN);
    location.href = ATTENDANCE_URL;
    return;
  }

  var target = window.open("", WINDOW_NAME);

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function onAttendancePage() {
    return location.pathname.replace(/\/+$/, "").indexOf(attendancePath) === 0;
  }

  function walkElements(root, visit) {
    var queue = [root];
    while (queue.length) {
      var node = queue.shift();
      if (node.nodeType === 1 && visit(node) === false) return;
      if (node.shadowRoot) queue.push(node.shadowRoot);
      var kids = node.children || [];
      for (var i = 0; i < kids.length; i++) queue.push(kids[i]);
    }
  }

  function parentOf(el) {
    if (el.parentElement) return el.parentElement;
    var root = el.getRootNode && el.getRootNode();
    return root && root.host ? root.host : null;
  }

  function visibleText(root) {
    var out = [];
    (function walk(node) {
      if (node.nodeType === 3) {
        var parent = node.parentElement || (node.parentNode && node.parentNode.host);
        if (parent && parent.getClientRects().length) out.push(node.nodeValue);
        return;
      }
      if (node.shadowRoot) walk(node.shadowRoot);
      var kids = node.childNodes || [];
      for (var i = 0; i < kids.length; i++) walk(kids[i]);
    })(root);
    return out.join("\n");
  }

  function swipeHeaders() {
    var found = [];
    walkElements(document.body, function (el) {
      var text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (/^Swipes\b/i.test(text) && text.length < 80) found.push(el);
    });
    return found;
  }

  function readSwipes() {
    var headers = swipeHeaders();
    var el = headers[0];
    for (var level = 0; el && level < 8; level++) {
      var text = visibleText(el);
      var times = text.match(TIME_PATTERN);
      if (times && times.length) return { times: times, text: text };
      el = parentOf(el);
    }
    return null;
  }

  function toggles() {
    var headers = swipeHeaders();
    if (!headers.length) return [];
    var list = [];
    walkElements(headers[0], function (el) {
      if (el.matches("button, [role=button], [aria-expanded]")) list.push(el);
    });
    return list.concat(headers.slice().reverse());
  }

  async function waitFor(check, timeoutMs) {
    var deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (check()) return true;
      await sleep(250);
    }
    return check();
  }

  async function openAttendanceInPlace() {
    if (onAttendancePage()) return true;
    history.pushState(null, "", attendance.pathname + attendance.search);
    window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
    return waitFor(function () { return swipeHeaders().length > 0; }, 10000);
  }

  async function findSwipes() {
    await waitFor(function () { return swipeHeaders().length > 0; }, 5000);
    var result = readSwipes();
    if (result) return result;
    var candidates = toggles();
    for (var i = 0; i < candidates.length; i++) {
      candidates[i].click();
      await waitFor(function () { result = readSwipes(); return result !== null; }, 2500);
      if (result) return result;
    }
    var pageText = visibleText(document.body);
    var pageTimes = pageText.match(TIME_PATTERN);
    return pageTimes ? { times: pageTimes, text: pageText } : null;
  }

  function closeBlankTarget() {
    try {
      if (target && target.location.href === "about:blank") target.close();
    } catch (e) {}
  }

  function sendToTracker(found) {
    var now = new Date();
    var today = now.getDate() + " " + MONTHS[now.getMonth()] + " " + now.getFullYear();
    var dates = (found.text.match(DATE_PATTERN) || []).map(function (d) { return d.replace(/^0/, ""); });
    if (dates.length && dates.indexOf(today) === -1 && !confirm("These swipes are for " + dates[0] + ", not today. Use them anyway?")) {
      closeBlankTarget();
      return;
    }
    var url = APP_URL + "#" + HASH_KEY + "=" + encodeURIComponent(found.times.join("\n"));
    if (target) {
      target.location.href = url;
      target.focus();
    } else if (!window.open(url, WINDOW_NAME)) {
      alert("Allow pop-ups for GreytHR so Zentek Import can open the time tracker.");
    }
  }

  openAttendanceInPlace().then(function (opened) {
    if (!opened) {
      closeBlankTarget();
      alert(CLICK_AGAIN);
      location.href = ATTENDANCE_URL;
      return;
    }
    return findSwipes().then(function (found) {
      if (!found) {
        closeBlankTarget();
        alert("Couldn't find your swipes. Make sure today's date is selected in Attendance Info, then try again.");
        return;
      }
      sendToTracker(found);
    });
  });
})();`;

export const buildBookmarkletHref = (appUrl: string, attendanceUrl: string = GREYTHR_ATTENDANCE_URL): string => {
  const source = BOOKMARKLET_SOURCE.replace("__APP_URL__", () => JSON.stringify(appUrl))
    .replace("__ATTENDANCE_URL__", () => JSON.stringify(attendanceUrl))
    .replace("__WINDOW_NAME__", () => JSON.stringify(TRACKER_WINDOW_NAME))
    .replace("__HASH_KEY__", () => JSON.stringify(SWIPES_HASH_KEY));
  return `javascript:${encodeURIComponent(source)}`;
};
