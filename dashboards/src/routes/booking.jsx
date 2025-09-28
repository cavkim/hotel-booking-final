import { BookingPage } from "@/views/booking";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/booking")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <BookingPage />
    </div>
  );
}
