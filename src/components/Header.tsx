"use client";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "~/lib/auth";
//import { headers } from "next/headers";
//import { redirect } from "next/navigation";

import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Search } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import { useSessionStore } from "~/store/sessionStore";
import SignOutButton from "./SignOutButton";
const Header = () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  const user = useSessionStore((state) => state.user);
  console.log(user);
  return (
    <div className="border-b px-4">
      <div className="mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={50}
            height={50}
          />

          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              WRI BPHRU Equipment Booking System
            </h1>
          </Link>
        </div>

        <div className="flex gap-4">
          <div className="hidden border-r md:inline"></div>

          {user ? (
            <div className="flex items-center gap-2">
              {/* <Link href="/" className={buttonVariants()}>
                {" "}
                Dashboard
              </Link> */}
              {/* <form
                action={async () => {
                  "use server";
                  await auth.api.signOut({
                    headers: await headers(),
                  });
                  console.log("signed out");
                  redirect("/");
                }}
              >
                <Button type="submit">Sign Out</Button>
              </form> */}
              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {" "}
              <Link href="/sign-in" className={buttonVariants()}>
                <h1>Login</h1>
              </Link>
              {/* <Link href="/sign-up" className={buttonVariants()}>
                <h1>Register</h1>
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
