"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const AccountDropdown = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } finally {
      router.push("/");
    }
  };

  return (
    <Button size="sm" variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  );
};

export default AccountDropdown;
