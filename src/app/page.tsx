"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
const Home = () => {
  const { data: session } = authClient.useSession();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-red-500">Hello Tradelogix</h1>
      <Button>Log a trade</Button>
      {JSON.stringify(session)}
      {session && <Button onClick={() => authClient.signOut()}>Log out</Button>}
    </div>
  );
};

export default Home;
