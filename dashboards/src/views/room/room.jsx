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
import { RoomAction } from "./room-action";

import { ChevronRight, Circle, Edit, Trash } from "lucide-react";
import { useRooms } from "@/hooks";

function getStatusVariant(status) {
  switch (status) {
    case "AVAILABLE":
      return "default";
    case "BOOKING":
      return "secondary";
    case "OCCUPIED":
      return "destructive";
    case "MAINTENANCE":
      return "outline";
    default:
      return "default";
  }
}

function getStatusColor(status) {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "BOOKING":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "OCCUPIED":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "MAINTENANCE":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

export default function RoomDataTable() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isActionOpen, setIsActionOpen] = useState(false);

  const { data: rooms, isLoading, error, refetch } = useRooms();

  const handleRowClick = (room) => {
    setSelectedRoom(room);
    setIsActionOpen(true);
  };

  const handleCloseAction = () => {
    setIsActionOpen(false);
    setSelectedRoom(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Room</h2>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" disabled>
            Create
          </Button>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-muted-foreground animate-ping">
            <Circle />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Room</h2>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Create
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-2">
          <div className="text-sm text-red-600">
            Error loading rooms: {error.message}
          </div>
          <Button variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Room</h2>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Create
          </Button>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-muted-foreground">No rooms found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Room</h2>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Create
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Room Number</TableHead>
              <TableHead className="font-semibold">Room Type</TableHead>
              <TableHead className="font-semibold">Status</TableHead>{" "}
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow
                key={room.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleRowClick(room)}
              >
                <TableCell className="font-medium">{room.roomNumber}</TableCell>
                <TableCell>{room.roomTypeName}</TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusVariant(room.status)}
                    className={getStatusColor(room.status)}
                  >
                    {room.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center items-center">
                      <Button size="sm" className=" text-white px-4 py-1">
                        <Edit />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </TableCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RoomAction
        room={selectedRoom}
        isOpen={isActionOpen}
        onClose={handleCloseAction}
      />
    </div>
  );
}
