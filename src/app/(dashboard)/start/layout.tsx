import Account from "@/app/account/page";
import { Button } from "@/components/ui/button";
import AccountDropdown from "@/features/account/components/AccountDropdown";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth();
  return (
    <main>
      <nav className="p-4 flex justify-end gap-4">
        <AccountDropdown />
      </nav>
      {children}
    </main>
  );
};

export default Layout;
