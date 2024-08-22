"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { TMyButtonProps } from "@/types";

export default function MyButton({
  children,
  link = "",
  variant = "default",
  size = "md",
  className,
}: TMyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <Link
      className={clsx(
        `min-w-fit w-fit h-fit border rounded-md font-semibold px-2 py-1 transition-all duration-300 flex items-center justify-center transform ${isPressed ? "duration-150 scale-95" : " scale-100"}`,
        {
          "text-zinc-600 bg-transparent ": variant === "default",
          "text-dark1 bg-white hover:text-black hover:bg-white/80":
            variant === "light",
          "text-white bg-dark2 border-black  hover:bg-dark1":
            variant === "dark",
          "text-white bg-dark1  hover:text-dark1 hover:bg-white":
            variant === "darkLight",
          "border-none underline text-dark2 hover:text-black !scale-100":
            variant === "underline",

          "text-xs ": size === "xs",
          "text-sm px-3 py-1": size === "sm",
          "text-base px-4 py-2": size === "md",
          "text-lg px-5 py-2": size === "lg",
          "text-xl !px-6 py-3": size === "xl",
          "text-2xl px-7 py-3": size === "2xl",
          "text-3xl px-8 py-4": size === "3xl",
        },
        className,
      )}
      href={link}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </Link>
  );
}
