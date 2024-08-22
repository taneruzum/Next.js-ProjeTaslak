"use client";
import React from "react";

import MyButton from "@/components/MyButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-8 md:py-10 ">
      <MyButton link="/test/checkbuttons" size="lg" variant="dark">
        Check All Buttons
      </MyButton>
      <MyButton link="/test/apipage" variant="dark">
        Api Test
      </MyButton>
    </div>
  );
}
