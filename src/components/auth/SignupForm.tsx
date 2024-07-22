"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userRegisterSchema } from "@/lib/validations/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { APIError } from "@/types/ApiResonse";
// import { Icons } from "@/components/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterSchema>;

export default function RegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return toast({
        title: "User Registered",
        description: "Please wait while we redirect you",
      });
    } catch (e) {
      const axiosError = e as AxiosError<APIError>;
      return toast({
        title: "Something went wrong",
        description: axiosError.response?.data.error,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="text-sm font-bold" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              type="text"
              autoCapitalize="on"
              autoComplete="name"
              disabled={isLoading}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
            <span className="mt-5"></span>
            <Label className="text-sm font-bold" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
            <span className="mt-5"></span>
            <Label
              className="text-sm font-bold flex justify-between"
              htmlFor="password"
            >
              <span>Password</span>
              <span className="font-normal">
                <Link href={"/forgot/"} className="underline">
                  Forgot Password?
                </Link>
              </span>
            </Label>
            <Input
              id="password"
              placeholder="name@example.com"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <span className="mt-2"></span>
          <Button className={cn(buttonVariants())} disabled={isLoading}>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
