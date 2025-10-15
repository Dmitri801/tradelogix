import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";

export default async function Account() {
  await requireAuth();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Account Page</h1>
    </div>
  );
}
