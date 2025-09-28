"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  User,
  MapPin,
  DollarSign,
  Home,
  Calendar,
  Clock,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRoomDetail } from "@/hooks";

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

export function RoomAction({ room, isOpen, onClose }) {
  // Fetch detailed room data when room ID is available
  const {
    data: roomDetail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useRoomDetail(room?.id, {}, { enabled: !!room?.id && isOpen });

  const handleEdit = () => {
    console.log("Edit room:", room?.id);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = () => {
    console.log("Delete room:", room?.id);
    // TODO: Show confirmation dialog and delete
  };

  const handleDuplicate = () => {
    console.log("Duplicate room:", room?.id);
    // TODO: Duplicate room functionality
  };

  if (!room) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[500px] p-6">
        {/* <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="flex items-center">
                <h3 className="text-lg font-semibold">Room Information</h3>
              </SheetTitle>
              <SheetDescription>
                View room details and information
              </SheetDescription>
            </div>
          </div>
        </SheetHeader> */}

        <div className="flex-1 space-y-6 py-6">
          {/* Room Status */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Current Status</span>
            </div>
            <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
          </div> */}

          {/* <Separator /> */}

          {/* Loading state */}
          {isLoadingDetail && (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">
                Loading room details...
              </div>
            </div>
          )}

          {/* Error state */}
          {detailError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm text-red-600">
                Error loading details: {detailError.message}
              </div>
            </div>
          )}

          {/* Room Information */}
          <div className="space-y-6">
            {/* Basic Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Room Information</h3>

              <div className="grid gap-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Room Number</span>
                  </div>
                  <span className="text-sm">{room.roomNumber}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Room Type</span>
                  </div>
                  <span className="text-sm">{room.roomTypeName}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Room Type ID</span>
                  </div>
                  <span className="text-sm">#{room.roomTypeId}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Room ID</span>
                  </div>
                  <span className="text-sm font-mono">#{room.id}</span>
                </div>
              </div>
            </div>

            {roomDetail && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Details</h3>

                  <div className="grid gap-4">
                    {roomDetail.price && (
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Price per Night
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          {roomDetail.price}
                        </span>
                      </div>
                    )}

                    {roomDetail.capacity && (
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Capacity</span>
                        </div>
                        <span className="text-sm">
                          {roomDetail.capacity} guests
                        </span>
                      </div>
                    )}

                    {roomDetail.description && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Description</span>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {roomDetail.description}
                        </p>
                      </div>
                    )}

                    {roomDetail.amenities && (
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Amenities</span>
                        <div className="flex flex-wrap gap-1">
                          {roomDetail.amenities
                            .split(",")
                            .map((amenity, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {amenity.trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    {roomDetail.lastUpdated && (
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Last Updated
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(
                            roomDetail.lastUpdated
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
