"use client";

import RoomForm from "./room-form";

export default function CreateRoom({ isOpen, onClose, onSubmit }) {
  return (
    <RoomForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      mode="create"
    />
  );
}
