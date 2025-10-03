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

export default function UserForm({ formData, onChange, isCreate }) {
  const handleInputChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-4">
      {!isCreate && (
        <div className="space-y-2">
          <Label htmlFor="id">Guest ID</Label>
          <Input
            id="id"
            value={formData.id || ""}
            disabled
            className="bg-gray-50"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter guest name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter email address"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone || ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="Enter phone number"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status || "Active"}
          onValueChange={(value) => handleInputChange("status", value)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
