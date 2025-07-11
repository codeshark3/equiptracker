import "~/styles/globals.css";

import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import { type Metadata } from "next";
import { ModeToggle } from "~/components/Toggle";
import { Inter as FontSans } from "next/font/google";
import { SessionInitializer } from "~/components/SessionInitializer";

export const metadata: Metadata = {
  title: "BPHRU Booking System",
  description: "Created by Joel john Otchere-Baffour",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={``} suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <SessionInitializer />{" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Header /> */}
          {children}{" "}
          <div className="fixed bottom-4 right-4 z-50">
            <ModeToggle />
          </div>{" "}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
