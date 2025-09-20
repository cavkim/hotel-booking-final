"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const initialRooms = [
  {
    id: "1",
    roomNumber: "101",
    roomType: "Deluxe",
    price: "$150/night",
    status: "Available",
  },
  {
    id: "2",
    roomNumber: "102",
    roomType: "Deluxe",
    price: "$150/night",
    status: "Available",
  },
  {
    id: "3",
    roomNumber: "103",
    roomType: "Deluxe",
    price: "$150/night",
    status: "Booking",
  },
  {
    id: "4",
    roomNumber: "104",
    roomType: "Deluxe",
    price: "$150/night",
    status: "Available",
  },
  {
    id: "5",
    roomNumber: "201",
    roomType: "Suite",
    price: "$250/night",
    status: "Occupied",
  },
  {
    id: "6",
    roomNumber: "202",
    roomType: "Suite",
    price: "$250/night",
    status: "Maintenance",
  },
];

function getStatusVariant(status) {
  switch (status) {
    case "Available":
      return "default";
    case "Booking":
      return "secondary";
    case "Occupied":
      return "destructive";
    case "Maintenance":
      return "outline";
    default:
      return "default";
  }
}

function getStatusColor(status) {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Booking":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "Occupied":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Maintenance":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

export default function RoomDataTable() {
  const [rooms, setRooms] = useState(initialRooms);

  const handleEdit = (roomId) => {
    console.log("Edit room:", roomId);
    // Add edit functionality here
  };

  const handleDelete = (roomId) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

  const handleCreate = () => {
    console.log("Create new room");
    // Add create functionality here
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Room</h2>
        <Button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Create
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Room Number</TableHead>
              <TableHead className="font-semibold">Room Type</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell className="font-medium">{room.roomNumber}</TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(room.status)}
                  >
                    {room.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(room.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-xs"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(room.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
                    >
                      Delete
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
