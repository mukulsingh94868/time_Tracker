"use client";

import Modal from "@/components/modals/Modal";

export default function VideoModal({ onClose }) {
  return (
    <Modal
      onClose={onClose}
      panelClassName="max-w-4xl overflow-hidden"
      closeButtonClassName="top-3 right-3 z-10 bg-black/50 text-white hover:bg-black/70"
    >
      <div className="w-full aspect-video">
        <iframe
          className="w-full h-full"
          src="/assets/tutorial.mp4"
          title="Working Hours Guide"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
}
