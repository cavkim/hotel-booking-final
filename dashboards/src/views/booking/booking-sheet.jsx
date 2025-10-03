"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import BookingForm from "./booking-form";

export default function BookingSheet({
  isOpen,
  onOpenChange,
  mode,
  booking,
  formData,
  onFormChange,
  onSave,
  onModeChange,
}) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      Confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
      Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      Cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
      "Check-in": "bg-blue-100 text-blue-800 hover:bg-blue-100",
    };

    return (
      <Badge className={statusConfig[status] || "bg-gray-100 text-gray-800"}>
        {status}
      </Badge>
    );
  };

  const getSheetTitle = () => {
    if (mode === "create") return "Create New Booking";
    if (mode === "edit") return "Edit Booking";
    return "Booking Details";
  };

  const getSheetDescription = () => {
    if (mode === "create") return "Fill in the details to create a new booking";
    if (mode === "edit") return "Make changes to the booking details";
    return "View booking information";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{getSheetTitle()}</SheetTitle>
          <SheetDescription>{getSheetDescription()}</SheetDescription>
        </SheetHeader>

        {booking && (
          <div className="mt-6 space-y-4 p-4">
            {mode === "view" ? (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Booking ID
                  </Label>
                  <p className="text-sm text-gray-900">{booking.id}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Guest Name
                  </Label>
                  <p className="text-sm text-gray-900">{booking.guestName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Room
                  </Label>
                  <p className="text-sm text-gray-900">{booking.room}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Check-in
                  </Label>
                  <p className="text-sm text-gray-900">{booking.checkIn}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Check-out
                  </Label>
                  <p className="text-sm text-gray-900">{booking.checkOut}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Status
                  </Label>
                  <div>{getStatusBadge(booking.status)}</div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => onModeChange("edit")}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <>
                <BookingForm
                  formData={formData}
                  onChange={onFormChange}
                  isCreate={mode === "create"}
                />
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={onSave}
                  >
                    {mode === "create" ? "Create Booking" : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
