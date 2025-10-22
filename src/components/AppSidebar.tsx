"use client";
import {
  CreditCardIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  TrendingUpIcon,
  StarIcon,
  TrendingUp,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

const menuItems = [
  {
    title: "Plan",
    items: [
      {
        title: "Dashboard",
        icon: HomeIcon,
        url: "/dashboard",
      },
      {
        title: "Plan",
        icon: TrendingUpIcon,
        url: "/plan",
      },
    ],
  },
];

const AppSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Button variant="press" className="m-4">
          <Plus />
          Add Trade
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title} title={group.title}>
            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2">
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    isActive={pathname === item.url}
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link
                      href={item.url}
                      prefetch
                      className="flex items-center gap-4 w-full"
                    >
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
