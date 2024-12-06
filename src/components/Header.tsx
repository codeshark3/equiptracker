import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="border-b px-4">
      <div className="mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1>CSIR Database Management System</h1>
        </Link>

        <div>
          {session ? (
            <form
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
            </form>
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              <h1>Login</h1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
