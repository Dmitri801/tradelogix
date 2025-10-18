"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
const Home = () => {
  const { data: session } = authClient.useSession();

  return (
    <main>
      {session && (
        <nav className="p-4 flex justify-end gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => authClient.signOut()}
          >
            Sign out
          </Button>
        </nav>
      )}
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Button size="lg">Start your day</Button>
        {JSON.stringify(session, null, 2)}
      </div>
    </main>
  );
};

export default Home;
