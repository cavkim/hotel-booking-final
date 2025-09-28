"use client";

import RoomForm from "./room-form";

export default function EditRoom({ isOpen, onClose, onSubmit, room }) {
  return (
    <RoomForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      room={room}
      mode="edit"
    />
  );
}
