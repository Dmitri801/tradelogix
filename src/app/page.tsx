import { requireNoAuth } from "@/lib/auth-utils";

const Home = async () => {
  await requireNoAuth();
  return (
    <main>
    Landing Page
     
    </main>
  );
};

export default Home;
