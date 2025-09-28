import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { LogIn, User, Bell, Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/auth-provider";

export function AppHeader() {
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        {user ? (
          <>
            <span>
              Hello, <span className="font-bold">{user.firstName}</span>{" "}
            </span>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
