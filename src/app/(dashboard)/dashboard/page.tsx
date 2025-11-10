"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
const Page = () => {
  const trpc = useTRPC();
  const dayTradeQuery = useQuery(trpc.getTrades.queryOptions());

  if (dayTradeQuery.isPending) {
    return <div>Loading...</div>;
  }

  const trades = dayTradeQuery.data;
  console.log({trades})

  return (
    <div>
      <h1>Dashboard Home Page</h1>
      {trades?.map((trade) => (
        <div key={trade.id} className="mb-4 p-4 border rounded">
          <p>Market: {trade.assetType}</p>
          <p>Expected Hold Time: {trade.expectedHoldTime}</p>
          <p>Symbol: {trade.symbol}</p>
          <p>Target: {trade.target}</p>
          <p>Stop-Loss: {trade.stopLoss}</p>
          <p>Direction: {trade.direction}</p>
          <p>Strike: {trade.strike}</p>
          <p>Option Type: {trade.optionType}</p>
          <h2 className="mt-2 font-semibold">Actions:</h2>
          {trade.actions.map((action) => (
            <div key={action.id} className="ml-4">
              <p>Action Type: {action.actionType}</p>
              <p>Price: {action.price}</p>
              <p>Size: {action.size}</p>
              <p>Fees: {action.fees}</p>
              <p>
                Timestamp: {new Date(action.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
          <p>Status: {trade.status}</p>
          <p>Created At: {new Date(trade.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
