"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = "1";
              ref.current.style.transform = "translateY(0)";
            }
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const style: CSSProperties = {
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.75s ease, transform 0.75s ease",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
