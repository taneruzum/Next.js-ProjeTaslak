import { ReactNode, SVGProps } from "react";
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type TMyButtonProps = {
  children: ReactNode;
  link?: string;
  variant?: "default" | "light" | "dark" | "darkLight" | "underline";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
};
