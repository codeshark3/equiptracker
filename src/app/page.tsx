import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import Header from "~/components/Header";
import { H } from "node_modules/better-auth/dist/index-CS8-YiCU";

export default async function HomePage() {
  return (
    <div>
      <Header />
      <div>
        <h1>Hello main page</h1>
        <h1>Hello World</h1>
      </div>
    </div>
  );
}
