import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }
  const user = session?.user;
  return (
    <div>
      <h1>Hello World {user.name}</h1>
      <h1>Hello World {user.email}</h1>
    </div>
  );
}
