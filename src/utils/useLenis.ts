import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

/**
 * Initializes buttery-smooth inertial scrolling using Lenis,
 * tightly synchronized with the GSAP ticker and browser requestAnimationFrame.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll updates to GSAP ticker for frame-perfect harmony
    const updateGsap = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGsap);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsap);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
