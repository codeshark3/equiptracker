import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import Form from "next/form";
import Header from "~/components/Header";
import Footer from "~/components/landing/Footer";
import { Hero } from "~/components/landing/Hero";
import { Case } from "~/components/landing/Case";
import { Features } from "~/components/landing/Features";
import { Stats } from "~/components/landing/Stats";
import { ModeToggle } from "~/components/Toggle";
export default async function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
      <Case />
      <Stats />
      <Features />

      <Footer />

      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </div>

    // <div>
    //   <Header />
    //   <div className="flex items-center justify-center">
    //     <Form action="/search">
    //       <input type="text" name="query" />
    //       <button type="submit">Submit</button>
    //     </Form>
    //   </div>
    // </div>
  );
}
