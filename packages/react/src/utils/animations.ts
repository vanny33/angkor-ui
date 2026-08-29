import { useEffect, useState } from "react";

// Hook to check if reduced motion is preferred
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReduced;
}

// Function to generate transitions based on settings
export function getTransition(
  animated: boolean,
  prefersReduced: boolean,
  customTransition?: any
) {
  if (!animated || prefersReduced) {
    return { duration: 0 };
  }
  return customTransition || { type: "spring", duration: 0.3, bounce: 0.15 };
}

// Preset Motion Variants
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeUpVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
};

export const scaleInVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

export const slideDownVariants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const shakeVariants = {
  animate: {
    x: [0, -6, 6, -6, 6, 0],
    transition: { duration: 0.4 },
  },
};

export const springPressProps = (animated: boolean, prefersReduced: boolean) => {
  if (!animated || prefersReduced) return {};
  return {
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 15 },
  };
};
