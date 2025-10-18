"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .min(1, { message: "Email is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(
            ctx.error?.message ?? "Something went wrong. Please try again."
          );
        },
      }
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col flex-1 w-full gap-6 p-5">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Login to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
              className="space-y-6"
            >
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="dark"
                    className="w-full"
                    type="button"
                    disabled={isPending}
                  >
                    <Image
                      src="/logos/google-white-icon.png"
                      alt="google icon"
                      width={20}
                      height={20}
                    />
                    Continue with Google
                  </Button>
                  <Button
                    variant="dark"
                    className="w-full"
                    type="button"
                    disabled={isPending}
                  >
                    <Image
                      src="/logos/apple-logo-white.png"
                      alt="apple icon"
                      width={20}
                      height={20}
                    />
                    Continue with Apple
                  </Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={cn("w-full", isPending && "opacity-70")}
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          <p className="text-sm text-center text-muted-foreground mt-4">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
