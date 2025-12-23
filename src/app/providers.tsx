"use client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>{children}</AuthGate>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {

  return <>{children}</>;
}
