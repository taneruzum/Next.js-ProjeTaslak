"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import useIntersectionObserver from "@/src/hooks/interSection";

type LazyImageProps = {
  src: string | StaticImageData;
  width?: number;
  height?: number;
  fill?: boolean; // Changed to optional
  alt: string;
  threshold?: number;
  classNames?: string;
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  fill,
  threshold = 0.4,
  classNames = "",
}) => {
  const [ref, isVisible, isLoading, setLoading] = useIntersectionObserver({
    threshold,
  }) as [
      React.MutableRefObject<HTMLDivElement | null>,
      boolean,
      boolean,
      (loading: boolean) => void,
    ];
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
    setIsLoaded(true);
  };

  const imageProps = fill ? { fill: true } : { width, height };

  return (
    <div
      ref={ref}
      className={`w-full h-full flex justify-center transition-all ${isLoaded ? "animate-none" : "animate-pulse"}`}
    >
      {isVisible && (
        <Image
          alt={alt}
          className={`object-cover transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"} ${classNames}`}
          quality={75}
          src={src}
          onLoad={handleImageLoad}
          {...imageProps} // Spread the conditionally created props
        />
      )}
    </div>
  );
};

export default LazyImage;
