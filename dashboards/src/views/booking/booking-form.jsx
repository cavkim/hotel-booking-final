"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookingForm({ formData, onChange, isCreate = false }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bookingId">Booking ID</Label>
        <Input
          id="bookingId"
          value={formData.id}
          onChange={(e) => onChange({ ...formData, id: e.target.value })}
          disabled={!isCreate}
          className={!isCreate ? "bg-gray-50" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="guestName">Guest Name</Label>
        <Input
          id="guestName"
          value={formData.guestName}
          onChange={(e) => onChange({ ...formData, guestName: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="room">Room</Label>
        <Input
          id="room"
          value={formData.room}
          onChange={(e) => onChange({ ...formData, room: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkIn">Check-in</Label>
        <Input
          id="checkIn"
          type="date"
          value={formData.checkIn}
          onChange={(e) => onChange({ ...formData, checkIn: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkOut">Check-out</Label>
        <Input
          id="checkOut"
          type="date"
          value={formData.checkOut}
          onChange={(e) => onChange({ ...formData, checkOut: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => onChange({ ...formData, status: value })}
        >
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Check-in">Check-in</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
