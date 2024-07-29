import { User2 } from "lucide-react";
import Link from "next/link";
import CartButton from "../Cart/CartButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navlinks() {
  const session = await getServerSession(authOptions);
  return (
    <ul className="flex justify-between gap-5">
      {session?.user.isAdmin ? (
        <Link
          href={"/admin/"}
          className="flex item-center gap-2 border-black md:px-4 py-2 md:border rounded-full bg-background"
        >
          <User2 />
          <span className="hidden md:block">Admin</span>
        </Link>
      ) : (
        <Link
          href={"/account/profile/"}
          className="flex item-center gap-2 border-black md:px-4 py-2 md:border rounded-full bg-background"
        >
          <User2 />
          <span className="hidden md:block">Account</span>
        </Link>
      )}
      <CartButton />
    </ul>
  );
}
