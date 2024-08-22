"use client";
import React from "react";

import useIntersectionObserver from "@/hooks/interSection";

type LazyTextProps = {
  children: React.ReactNode;
  threshold?: number;
  classNames?: string;
  animationStart?: "top" | "bottom" | "left" | "right";
  staggerDelay?: number;
};

const LazyText: React.FC<LazyTextProps> = ({
  children,
  threshold = 0.4,
  classNames = "",
  animationStart = "bottom",
  staggerDelay = 100, // Default değer 100ms
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold,
  });

  const animationClasses = {
    top: "-translate-y-10",
    bottom: "translate-y-10",
    left: "-translate-x-10",
    right: "translate-x-10",
  };

  const renderChildrenWithDelay = () => {
    return React.Children.map(children, (child, index) => (
      <div
        className={`transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : `opacity-0 ${animationClasses[animationStart]}`
        }`}
        style={{ transitionDelay: `${index * staggerDelay}ms` }}
      >
        {child}
      </div>
    ));
  };

  return (
    <div
      ref={ref as React.MutableRefObject<HTMLDivElement>}
      className={classNames}
    >
      {renderChildrenWithDelay()}
    </div>
  );
};

export default LazyText;
