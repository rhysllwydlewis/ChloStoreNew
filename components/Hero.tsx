'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [videoVisible, setVideoVisible] = useState(true);

  useEffect(() => {
    // Respect reduced motion preference — skip video immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVideoVisible(false);
      return;
    }
    const timer = setTimeout(() => setVideoVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleShopClick = () => {
    const target = document.querySelector('#shop');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F7F1E7' }}
      aria-label="Hero"
    >
      {/* Full-bleed video background */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          opacity: videoVisible ? 1 : 0,
          transition: 'opacity 2s ease-out',
          willChange: 'opacity',
          pointerEvents: 'none',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Warm colour overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(247,241,231,0.18)' }}
        />

        {/* Soft vignette to frame the centre text during video phase */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(247,241,231,0) 0%, rgba(247,241,231,0.4) 100%)',
          }}
        />
      </div>

      {/* Permanent bottom blend — fades hero floor into the Store section's matching cream */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        aria-hidden="true"
        style={{
          height: '120px',
          background: 'linear-gradient(to top, #F7F1E7 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">

        {/* Ornamental mark above headline */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="block h-px w-10 bg-chlo-tan opacity-60" />
          <span className="text-chlo-tan opacity-70 text-xs tracking-[0.35em] uppercase font-light select-none">
            Luxury Cosmetics
          </span>
          <span className="block h-px w-10 bg-chlo-tan opacity-60" />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.28 }}
          className="text-7xl sm:text-8xl md:text-[10rem] font-bold tracking-[-0.02em] text-chlo-brown leading-none"
          style={{
            fontFamily: 'var(--font-playfair)',
            textShadow: videoVisible
              ? '0 1px 20px rgba(247,241,231,0.8)'
              : '0 1px 20px rgba(247,241,231,0)',
            transition: 'text-shadow 2s ease-out',
          }}
        >
          Chlo
        </motion.h1>

        {/* Thin decorative rule between headline and tagline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
          className="mt-7 h-px w-16 bg-chlo-tan"
          style={{ originX: 0 }}
        />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="text-xl md:text-2xl text-chlo-muted font-light mt-6 tracking-wide"
          style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
        >
          Effortless beauty, elevated.
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.82 }}
          className="text-base text-chlo-muted mt-5 max-w-lg leading-relaxed"
        >
          Luxury cosmetics crafted with clean formulas and a passion for confidence.
          Discover beauty that feels as good as it looks.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.02 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <button
            type="button"
            onClick={handleShopClick}
            className="px-9 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-md active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chlo-brown focus-visible:ring-offset-2 focus-visible:ring-offset-chlo-cream"
            style={{ backgroundColor: '#3B2F2A', color: '#FFFCF7', letterSpacing: '0.12em' }}
          >
            Shop Now
          </button>
          <button
            type="button"
            onClick={handleAboutClick}
            className="px-9 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase border transition-all duration-300 hover:bg-chlo-beige hover:scale-[1.03] active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chlo-brown focus-visible:ring-offset-2 focus-visible:ring-offset-chlo-cream"
            style={{ borderColor: '#3B2F2A', color: '#3B2F2A', letterSpacing: '0.12em' }}
          >
            Our Story
          </button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={handleShopClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-chlo-muted hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chlo-brown rounded"
        aria-label="Scroll to explore"
      >
        <div className="animate-bounce-slow motion-reduce:animate-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.button>
    </section>
  );
}