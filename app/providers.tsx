import * as React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <React.Fragment>{children}</React.Fragment>;
}
