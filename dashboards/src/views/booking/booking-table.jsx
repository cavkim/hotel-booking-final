"use client";

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

export default function BookingTable({ bookings, onView, onEdit }) {
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
            <TableHead className="font-semibold text-gray-900">Room</TableHead>
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
                    onClick={() => onView(booking.id)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1"
                    onClick={() => onEdit(booking.id)}
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
  );
}
