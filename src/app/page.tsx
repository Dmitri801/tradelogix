import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

const Home = async () => {
  const users = await prisma.user.findMany();
  console.log({ users });
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-red-500">Hello Tradelogix</h1>
      <Button>Log a trade</Button>
      {JSON.stringify(users)}
    </div>
  );
}

export default Home;
