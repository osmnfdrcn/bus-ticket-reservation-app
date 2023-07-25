"use client";
import React from "react";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const buttonOnClick = session
    ? () => {
        signOut();
        toast.success("Cikis yapildi");
      }
    : () => router.push("/auth");

  return (
    <div className="w-full h-[60px] lg:h-[80px]  bg-white fixed top-0 left-0 right-0 z-50 px-[10px] border border-b-1">
      <div className="max-w-[1280px] h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex  items-center justify-end gap-2">
          <p className="text-xs font-semibold   px-4 py-2 text-slate-700 ">
            {" "}
            {session?.user?.name || "Misafir"}
          </p>

          <Button
            className="justify-self-center"
            variant={`${session?.user ? "secondary" : "primary"}`}
            size="default"
            onClick={buttonOnClick}
          >
            {!!session ? "Cikis" : "Giris"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
