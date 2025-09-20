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

const initialUsers = [
  {
    id: "G001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    bookingHistory: "View History",
  },
  {
    id: "G002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    bookingHistory: "View History",
  },
  {
    id: "G003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1234567892",
    bookingHistory: "View History",
  },
  {
    id: "G004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1234567893",
    bookingHistory: "View History",
  },
];

export default function UserPage() {
  const [users, setUsers] = useState(initialUsers);

  const handleViewHistory = (userId) => {
    console.log("View history for user:", userId);
    // Add view history functionality here
  };

  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
    // Add edit functionality here
  };

  const handleBan = (userId) => {
    console.log("Ban user:", userId);
    // Add ban functionality here
  };

  const handleResetPassword = (userId) => {
    console.log("Reset password for user:", userId);
    // Add reset password functionality here
  };

  const handleAddGuest = () => {
    console.log("Add new guest");
    // Add create functionality here
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">User</h2>
        <Button
          onClick={handleAddGuest}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add Guest
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Guest ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Booking History</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleViewHistory(user.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs"
                  >
                    View History
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(user.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-xs"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleBan(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
                    >
                      Ban
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleResetPassword(user.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs"
                    >
                      Reset Password
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
