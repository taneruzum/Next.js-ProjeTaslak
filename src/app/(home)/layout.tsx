import React from "react";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col w-full min-h-screen items-center justify-between bg-background"
      id="home"
    >
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
