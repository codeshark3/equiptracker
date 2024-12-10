import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import Form from "next/form";
import Header from "~/components/Header";

export default async function HomePage() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <Form action="/search">
          <input type="text" name="query" />
          <button type="submit">Submit</button>
        </Form>
      </div>
    </div>
  );
}
