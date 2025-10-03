"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import UserForm from "./user-form";

export default function UserSheet({
  isOpen,
  onOpenChange,
  mode,
  user,
  formData,
  onFormChange,
  onSave,
  onModeChange,
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

  const getSheetTitle = () => {
    if (mode === "create") return "Add New Guest";
    if (mode === "edit") return "Edit Guest";
    return "Guest Details";
  };

  const getSheetDescription = () => {
    if (mode === "create") return "Fill in the details to add a new guest";
    if (mode === "edit") return "Make changes to the guest details";
    return "View guest information";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{getSheetTitle()}</SheetTitle>
          <SheetDescription>{getSheetDescription()}</SheetDescription>
        </SheetHeader>

        {user && (
          <div className="mt-6 space-y-4 p-4">
            {mode === "view" ? (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Guest ID
                  </Label>
                  <p className="text-sm text-gray-900">{user.id}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Name
                  </Label>
                  <p className="text-sm text-gray-900">{user.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <p className="text-sm text-gray-900">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Phone
                  </Label>
                  <p className="text-sm text-gray-900">{user.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Status
                  </Label>
                  <div>{getStatusBadge(user.status)}</div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => onModeChange("edit")}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <>
                <UserForm
                  formData={formData}
                  onChange={onFormChange}
                  isCreate={mode === "create"}
                />
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={onSave}
                  >
                    {mode === "create" ? "Add Guest" : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
