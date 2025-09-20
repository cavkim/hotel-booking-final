"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SettingPage() {
  const [hotelInfo, setHotelInfo] = useState({
    name: "Grand Hotel",
    description: "Luxury hotel in the heart of the city...",
    logoUrl: "https://example.com/logo.png",
  });

  const [adminAccount, setAdminAccount] = useState({
    username: "admin",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
  });

  const handleUpdateHotelInfo = () => {
    console.log("Update hotel info:", hotelInfo);
    // Add update hotel info functionality here
  };

  const handleUpdateCredentials = () => {
    console.log("Update credentials:", adminAccount);
    // Add update credentials functionality here
  };

  const handleSavePreferences = () => {
    console.log("Save preferences:", notifications);
    // Add save preferences functionality here
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hotel Information Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">
            Hotel Information
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hotel-name" className="text-sm font-medium">
                Hotel Name
              </Label>
              <Input
                id="hotel-name"
                value={hotelInfo.name}
                onChange={(e) =>
                  setHotelInfo({ ...hotelInfo, name: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={hotelInfo.description}
                onChange={(e) =>
                  setHotelInfo({ ...hotelInfo, description: e.target.value })
                }
                className="w-full min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-url" className="text-sm font-medium">
                Logo URL
              </Label>
              <Input
                id="logo-url"
                value={hotelInfo.logoUrl}
                onChange={(e) =>
                  setHotelInfo({ ...hotelInfo, logoUrl: e.target.value })
                }
                className="w-full"
              />
            </div>

            <Button
              onClick={handleUpdateHotelInfo}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Update Hotel Info
            </Button>
          </div>
        </div>

        {/* Admin Account Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">
            Admin Account
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                value={adminAccount.username}
                onChange={(e) =>
                  setAdminAccount({ ...adminAccount, username: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-medium">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={adminAccount.newPassword}
                onChange={(e) =>
                  setAdminAccount({
                    ...adminAccount,
                    newPassword: e.target.value,
                  })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm new password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="confirm new password"
                value={adminAccount.confirmPassword}
                onChange={(e) =>
                  setAdminAccount({
                    ...adminAccount,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full"
              />
            </div>

            <Button
              onClick={handleUpdateCredentials}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Update Credentials
            </Button>
          </div>

          {/* Notification Preferences Section */}
          <div className="space-y-4 pt-6">
            <h3 className="text-lg font-semibold text-foreground">
              Notification Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label
                  htmlFor="email-notifications"
                  className="text-sm font-medium"
                >
                  Email notifications
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, sms: checked })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label
                  htmlFor="sms-notifications"
                  className="text-sm font-medium"
                >
                  SMS notifications
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label
                  htmlFor="push-notifications"
                  className="text-sm font-medium"
                >
                  Push notifications
                </Label>
              </div>

              <Button
                onClick={handleSavePreferences}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
