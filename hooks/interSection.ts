import { useState, useEffect, useRef, MutableRefObject } from "react";

//FOR IMAGES
interface UseIntersectionObserverProps {
  threshold?: number;
}

type UseIntersectionObserverReturn = [
  MutableRefObject<HTMLElement | null>,
  boolean,
  boolean,
  (loading: boolean) => void,
];

const useIntersectionObserver = ({
  threshold = 0.2,
}: UseIntersectionObserverProps): UseIntersectionObserverReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setLoading(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  return [ref, isVisible, isLoading, setLoading];
};

export default useIntersectionObserver;
