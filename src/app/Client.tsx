"use client";

import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function Client() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.getUsers.queryOptions());

  return <div>Client Component
    {JSON.stringify(data)}
  </div>;
}
