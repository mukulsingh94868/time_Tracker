"use client";

import Modal from "@/components/modals/Modal";

interface VideoModalProps {
  onClose: () => void;
}

export default function VideoModal({ onClose }: Readonly<VideoModalProps>) {
  return (
    <Modal
      title="Video Tutorial"
      onClose={onClose}
      panelClassName="max-w-4xl p-0 overflow-hidden"
      closeButtonClassName="top-3 right-3 z-10 bg-black/50 text-white hover:bg-black/70"
    >
      <div className="w-full aspect-video">
        <iframe
          className="w-full h-full border-0"
          src="/assets/tutorial.mp4"
          title="Working Hours Guide"
          allowFullScreen
        />
      </div>
    </Modal>
  );
}
