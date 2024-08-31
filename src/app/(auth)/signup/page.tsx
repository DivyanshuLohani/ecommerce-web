import Link from "next/link";
import Image from "next/image";
import RegisterForm from "@/components/auth/SignupForm";

export default function page() {
  return (
    <div>
      <header className="flex h-16 items-center border-b px-4 md:px-6 bg-[#4151f9] text-white gap-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src={"/logo.jpg"} width={50} height={50} alt="Logo" />

          <span className="font-semibold">Maa Kali Griha Udyog</span>
        </Link>
      </header>
      <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              Welcome new Customer
            </h2>
          </div>
          <RegisterForm />
          <div className="text-center text-sm text-muted-foreground">
            {"Already have an account? "}
            <Link
              href="/login/"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
