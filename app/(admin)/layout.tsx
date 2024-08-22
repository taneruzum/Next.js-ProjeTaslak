import React from "react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex items-center justify-center !bg-[#ffffff] inset-0">
      {children}
    </div>
  );
}
