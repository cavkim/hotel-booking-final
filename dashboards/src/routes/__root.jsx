import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/modules/components/Sidebar";
import { AppHeader } from "@/modules/components/Header";

function RootComponent() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  if (isAuthPage) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Outlet />
        </div>
        <TanStackRouterDevtools />
      </>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </div>
      </SidebarInset>
      <TanStackRouterDevtools />
    </SidebarProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
