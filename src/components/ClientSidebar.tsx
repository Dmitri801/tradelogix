"use client";

import AppSidebar from "./AppSidebar";
import { usePathname } from "next/navigation";

export default function ClientSidebar() {
  const pathname = usePathname() ?? "";

  // don't render the sidebar on the /start route
  if (pathname === "/start") return null;

  return <AppSidebar />;
}
