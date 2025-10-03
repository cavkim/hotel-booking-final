"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usersData } from "./static-data";
import UserTable from "./user-table";
import UserSheet from "./user-sheet";

export default function UserPage() {
  const [users, setUsers] = useState(usersData);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState("view");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});

  const handleAddGuest = () => {
    const newUser = {
      id: `G${String(users.length + 1).padStart(3, "0")}`,
      name: "",
      email: "",
      phone: "",
      status: "Active",
    };
    setSelectedUser(newUser);
    setFormData(newUser);
    setSheetMode("create");
    setIsSheetOpen(true);
  };

  const handleView = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setSheetMode("view");
    setIsSheetOpen(true);
  };

  const handleEdit = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setFormData(user);
    setSheetMode("edit");
    setIsSheetOpen(true);
  };

  const handleBan = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Banned" ? "Active" : "Banned" }
          : u
      )
    );
  };

  const handleResetPassword = (userId) => {
    console.log("Reset password for user:", userId);
    // Add reset password functionality here
  };

  const handleViewHistory = (userId) => {
    console.log("View history for user:", userId);
    // Add view history functionality here
  };

  const handleSave = () => {
    if (sheetMode === "create") {
      setUsers([...users, formData]);
    } else {
      setUsers(users.map((u) => (u.id === formData.id ? formData : u)));
    }
    setIsSheetOpen(false);
  };

  const handleModeChange = (newMode) => {
    if (newMode === "edit") {
      setFormData(selectedUser);
    }
    setSheetMode(newMode);
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

      <UserTable
        users={users}
        onView={handleView}
        onEdit={handleEdit}
        onBan={handleBan}
        onResetPassword={handleResetPassword}
        onViewHistory={handleViewHistory}
      />

      <UserSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        mode={sheetMode}
        user={selectedUser}
        formData={formData}
        onFormChange={setFormData}
        onSave={handleSave}
        onModeChange={handleModeChange}
      />
    </div>
  );
}
