import "@/../styles/globals.css";
import { Metadata } from "next";

import { Providers } from "./providers";

import { siteConfig } from "@/../config/site";
import { fontPoppins, inter } from "@/../config/fonts";

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
    <html
      className={`${inter.variable} ${fontPoppins.variable} scroll-smooth`}
      lang="en"
      suppressHydrationWarning={true}
    >
      <head />
      <body className="bg-rootBackground font-sans antialiased">
        <Providers>
          <main className="w-full min-h-dvh h-full px-4 grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
