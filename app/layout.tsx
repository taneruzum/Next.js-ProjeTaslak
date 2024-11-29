import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontPoppins } from "@/config/fonts";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning={true}>
      <head />
      <body
        className={clsx(
          "bg-rootBackground font-sans antialiased",
          fontSans.variable,
          fontPoppins.variable,
        )}
      >
        <Providers>
          <div className="relative flex flex-col items-center w-full h-full min-h-screen">
            <NavBar />
            <main className="w-full h-full px-4 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
