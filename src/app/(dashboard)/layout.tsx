"use server";
import AccountDropdown from "@/components/AccountDropdown";
import { requireAuth } from "@/lib/auth-utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import ClientSidebar from "@/components/ClientSidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth();
  return (
    <main>
      <nav className="p-4 flex justify-end gap-4">
        <SidebarProvider>
          <ClientSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
        <AccountDropdown />
      </nav>
    </main>
  );
};

export default Layout;
