import { LoginForm } from "@/features/auth/components/LoginForm";
import { requireNoAuth } from "@/lib/auth-utils";
const Page = async() => {
  await requireNoAuth();
  return (
    <div className="flex">
      <LoginForm />
    </div>
  );
};

export default Page;
