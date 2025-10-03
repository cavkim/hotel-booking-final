"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import BookingTable from "./booking-table";
import BookingSheet from "./booking-sheet";
import { bookingsData } from "./static-data";

export default function BookingPage() {
  const [bookings, setBookings] = useState(bookingsData);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState("view"); // "view", "edit", or "create"
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({});

  const handleCreate = () => {
    const newBooking = {
      id: `BK${String(bookings.length + 1).padStart(3, "0")}`,
      guestName: "",
      room: "",
      checkIn: "",
      checkOut: "",
      status: "Pending",
    };
    setSelectedBooking(newBooking);
    setFormData(newBooking);
    setSheetMode("create");
    setIsSheetOpen(true);
  };

  const handleView = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    setSelectedBooking(booking);
    setSheetMode("view");
    setIsSheetOpen(true);
  };

  const handleEdit = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    setSelectedBooking(booking);
    setFormData(booking);
    setSheetMode("edit");
    setIsSheetOpen(true);
  };

  const handleSave = () => {
    if (sheetMode === "create") {
      setBookings([...bookings, formData]);
    } else {
      setBookings(bookings.map((b) => (b.id === formData.id ? formData : b)));
    }
    setIsSheetOpen(false);
  };

  const handleModeChange = (newMode) => {
    if (newMode === "edit") {
      setFormData(selectedBooking);
    }
    setSheetMode(newMode);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Booking</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>

      <BookingTable
        bookings={bookings}
        onView={handleView}
        onEdit={handleEdit}
      />

      <BookingSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        mode={sheetMode}
        booking={selectedBooking}
        formData={formData}
        onFormChange={setFormData}
        onSave={handleSave}
        onModeChange={handleModeChange}
      />
    </div>
  );
}
