"use client";

import Modal from "@/components/modals/Modal";

interface VideoModalProps {
  onClose: () => void;
}

export default function VideoModal({ onClose }: Readonly<VideoModalProps>) {
  return (
    <Modal
      title="Video tutorial"
      description="A quick walkthrough of calculating your working hours."
      size="lg"
      onClose={onClose}
    >
      <div className="aspect-video w-full bg-black">
        <iframe
          className="h-full w-full border-0"
          src="/assets/tutorial.mp4"
          title="Working Hours Guide"
          allowFullScreen
        />
      </div>
    </Modal>
  );
}
