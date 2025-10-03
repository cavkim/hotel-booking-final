"use client";

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

export default function UserTable({
  users,
  onView,
  onEdit,
  onBan,
  onResetPassword,
  onViewHistory,
}) {
  const getStatusBadge = (status) => {
    if (status === "Active") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Active
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Banned</Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Guest ID</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Phone</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
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
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => onViewHistory(user.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs"
                >
                  View History
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onView(user.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs"
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onEdit(user.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-xs"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onBan(user.id)}
                    className={`px-3 py-1 text-xs text-white ${
                      user.status === "Banned"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {user.status === "Banned" ? "Unban" : "Ban"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onResetPassword(user.id)}
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
  );
}
