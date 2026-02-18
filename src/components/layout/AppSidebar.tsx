import {
  LayoutDashboard,
  Users,
  IndianRupee,
  Wallet,
  UserCircle,
  Settings,
  ShieldCheck,
  UserCheck,
  Receipt,
  AlertTriangle,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const affiliateItems = [
  { title: "Dashboard", url: "/affiliate/dashboard", icon: LayoutDashboard },
  { title: "My Sellers", url: "/affiliate/sellers", icon: Users },
  { title: "Earnings", url: "/affiliate/earnings", icon: IndianRupee },
  { title: "Withdraw", url: "/affiliate/withdrawals", icon: Wallet },
  { title: "Profile", url: "/affiliate/profile", icon: UserCircle },
];

const adminItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Affiliates", url: "/admin/affiliates", icon: UserCheck },
  { title: "Sellers", url: "/admin/sellers", icon: Users },
  { title: "Commission Settings", url: "/admin/commission-settings", icon: Settings },
  { title: "Withdrawals", url: "/admin/withdrawals", icon: Receipt },
  { title: "Fraud Monitor", url: "/admin/fraud", icon: AlertTriangle },
];

interface AppSidebarProps {
  role: "affiliate" | "admin";
  onRoleSwitch: (role: "affiliate" | "admin") => void;
}

export function AppSidebar({ role }: AppSidebarProps) {
  const location = useLocation();
  const items = role === "admin" ? adminItems : affiliateItems;

  return (
    <Sidebar className="border-r-0">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-sidebar-accent-foreground">importerr.com</h2>
            <p className="text-[10px] text-sidebar-foreground uppercase tracking-wider">
              {role === "admin" ? "Admin Panel" : "Affiliate Portal"}
            </p>
          </div>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
