import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }
  const user = session?.user;

  {
    user.role != "staff" ? redirect("/sign-in") : null;
  }
  return (
    <div>
      <h1>Hello World {user.name}</h1>
      <h1>Hello World {user.email}</h1>
    </div>
  );
};

export default page;
