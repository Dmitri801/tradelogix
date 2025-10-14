import { Button } from "@/components/ui/button";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import Client from "./Client";
const Home = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-red-500">Hello Tradelogix</h1>
        <Button>Log a trade</Button>
        <Suspense fallback={<div>Loading client...</div>}>
          <Client />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default Home;
