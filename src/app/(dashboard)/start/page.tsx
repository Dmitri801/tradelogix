"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Rocket } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Start = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const motivationalQuote = useMutation(
    trpc.getMotivationalQuote.mutationOptions()
  );

  useEffect(() => {
    motivationalQuote.mutate();
  }, []);

  const isLoading = !motivationalQuote.data || motivationalQuote.isPending;

  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <main>
      <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Button
          size="xlg"
          variant="press"
          onClick={() => router.push("/dashboard")}
        >
          Start your day <Rocket />
        </Button>

        <p className="text-accent-foreground text-center w-[30%] max-w-lg">
          {motivationalQuote.data}
        </p>
      </div>
    </main>
  );
};

export default Start;
