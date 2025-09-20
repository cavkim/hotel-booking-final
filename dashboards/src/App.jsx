import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppHeader } from "./modules/components/Header";
import { AppSidebar } from "./modules/components/Sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Content
            </h1>
            <p className="text-gray-600 mt-2">Your main content will go here</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
