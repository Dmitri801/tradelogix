import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { requireNoAuth } from "@/lib/auth-utils";
const Page = async () => {
  await requireNoAuth();
  return <RegisterForm />;
};

export default Page;
