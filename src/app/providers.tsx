"use client";

import { Provider } from "react-redux";

import { GlobalStore } from "@/lib/store";
import { useAuthCheck } from "@/hooks/useAuthCheck";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={GlobalStore}>
      <AuthGate>{children}</AuthGate>
    </Provider>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  useAuthCheck();

  return <>{children}</>;
}
