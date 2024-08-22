import React from "react";

import MyButton from "@/components/MyButton";

export default function CheckButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-8 md:py-10 ">
      <div className="flex  flex-col gap-4 items-center">
        <span className="uppercase font-bold text-2xl">Variants</span>
        <div className="flex flex-wrap gap-6">
          <MyButton variant="default">Default</MyButton>
          <MyButton variant="light">Light</MyButton>
          <MyButton variant="dark">Dark</MyButton>
          <MyButton variant="darkLight">Dark-Light</MyButton>
          <MyButton variant="underline">Read More...</MyButton>
          <MyButton
            className="py-4 border-2 border-purple-600/40 text-purple-500 bg-purple-200/30 hover:text-white hover:bg-purple-600 hover:border-purple-600 hover:shadow-inner hover:shadow-black"
            variant="default"
          >
            Custum on Default 1
          </MyButton>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 items-center">
        <span className="uppercase font-bold text-2xl">Sizes</span>
        <div className="w-full flex flex-wrap items-end gap-6">
          <MyButton size="xs" variant="dark">
            Xsmall
          </MyButton>
          <MyButton size="sm" variant="dark">
            small
          </MyButton>
          <MyButton size="md" variant="dark">
            medium
          </MyButton>
          <MyButton size="lg" variant="dark">
            large
          </MyButton>
          <MyButton size="xl" variant="dark">
            Xlarge
          </MyButton>
          <MyButton size="2xl" variant="dark">
            2Xlarge
          </MyButton>
          <MyButton size="3xl" variant="dark">
            3Xlarge
          </MyButton>
        </div>
        <div className="w-full flex flex-col gap-6 ">
          <MyButton size="xs" variant="light">
            xs
          </MyButton>
          <MyButton size="sm" variant="light">
            sm
          </MyButton>
          <MyButton size="md" variant="light">
            md
          </MyButton>
          <MyButton size="lg" variant="light">
            lg
          </MyButton>
          <MyButton size="xl" variant="light">
            xl
          </MyButton>
          <MyButton size="2xl" variant="light">
            2xl
          </MyButton>
          <MyButton size="3xl" variant="light">
            3xl
          </MyButton>
        </div>
        <MyButton
          className="w-full py-4 border-2 border-purp/50 text-purp/80 bg-purple-200/30 hover:text-white hover:bg-purp/80 hover:border-purp"
          variant="default"
        >
          Custum on Default 2
        </MyButton>
      </div>
    </div>
  );
}
