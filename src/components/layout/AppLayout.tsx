import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

interface AppLayoutProps {
  children: ReactNode;
  role: "affiliate" | "admin";
  onRoleSwitch: (role: "affiliate" | "admin") => void;
}

export function AppLayout({ children, role, onRoleSwitch }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar role={role} onRoleSwitch={onRoleSwitch} />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b bg-card flex items-center px-4 gap-3 shrink-0">
            <SidebarTrigger />
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">
                {role === "admin" ? "Admin Panel" : "Affiliate Dashboard"}
              </span>
              <button
                onClick={() => onRoleSwitch(role === "admin" ? "affiliate" : "admin")}
                className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Switch to {role === "admin" ? "Affiliate" : "Admin"} View
              </button>
            </div>
          </header>
          <div className="flex-1 p-6 overflow-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
