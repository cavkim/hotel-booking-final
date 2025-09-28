import RoomPage from "@/views/room/room";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/room")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <RoomPage />
    </div>
  );
}
