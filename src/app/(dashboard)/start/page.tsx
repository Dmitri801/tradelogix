"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Rocket } from "lucide-react";
import { toast } from "sonner";

const Start = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const createWorkflow = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow created successfully!");
      },
    })
  );
  return (
    <main>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Button size="lg">
          Start your day <Rocket />
        </Button>
        <Button
          size="lg"
          disabled={createWorkflow.isPending}
          onClick={() => {
            createWorkflow.mutate();
          }}
        >
          Create workflow
        </Button>
        {JSON.stringify(data)}
      </div>
    </main>
  );
};

export default Start;
