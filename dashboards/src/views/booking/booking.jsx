"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample booking data matching the design
const initialBookings = [
  {
    id: "BK001",
    guestName: "John Doe",
    room: "101",
    checkIn: "2025-07-10",
    checkOut: "2025-07-15",
    status: "Confirmed",
  },
  {
    id: "BK002",
    guestName: "Jane Smith",
    room: "102",
    checkIn: "2025-07-12",
    checkOut: "2025-07-18",
    status: "Confirmed",
  },
  {
    id: "BK003",
    guestName: "Mike Johnson",
    room: "103",
    checkIn: "2025-07-15",
    checkOut: "2025-07-20",
    status: "Pending",
  },
  {
    id: "BK004",
    guestName: "Sarah Wilson",
    room: "104",
    checkIn: "2025-07-18",
    checkOut: "2025-07-22",
    status: "Cancelled",
  },
];

export default function BookingPage() {
  const [bookings, setBookings] = useState(initialBookings);

  const handleView = (bookingId) => {
    console.log("View booking:", bookingId);
    // Add view logic here
  };

  const handleEdit = (bookingId) => {
    console.log("Edit booking:", bookingId);
    // Add edit logic here
  };

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Booking</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Create
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-900">
                Booking ID
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Guest Name
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Room
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Check-in
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Check-out
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.guestName}</TableCell>
                <TableCell>{booking.room}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1"
                      onClick={() => handleView(booking.id)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1"
                      onClick={() => handleEdit(booking.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
