'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  // activeVideo: 0 = no video, 1 = video 1 visible, 2 = video 2 visible
  const [activeVideo, setActiveVideo] = useState<0 | 1 | 2>(0);
  const [video1Ready, setVideo1Ready] = useState(false);
  const [video2Ready, setVideo2Ready] = useState(false);
  const [video1Failed, setVideo1Failed] = useState(false);
  const [video2Failed, setVideo2Failed] = useState(false);
  const [video1FadingOut, setVideo1FadingOut] = useState(false);
  const [video2FadingOut, setVideo2FadingOut] = useState(false);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const video1FadeTriggeredRef = useRef(false);
  const video2FadeTriggeredRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // both videos stay hidden; cream background is the fallback

    timersRef.current.push(setTimeout(() => setActiveVideo(1), 400));

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  // Explicitly play/pause and reset videos when the active slot changes
  useEffect(() => {
    if (activeVideo === 1) {
      const v1 = video1Ref.current;
      if (v1) { v1.currentTime = 0; v1.play().catch((e) => console.warn('[Hero] video1 play() failed:', e)); }
      const v2 = video2Ref.current;
      if (v2) v2.pause();
      setVideo2Ready(false);
      setVideo1FadingOut(false);
      video1FadeTriggeredRef.current = false;
    } else if (activeVideo === 2) {
      const v2 = video2Ref.current;
      if (v2) { v2.currentTime = 0; v2.play().catch((e) => console.warn('[Hero] video2 play() failed:', e)); }
      const v1 = video1Ref.current;
      if (v1) v1.pause();
      setVideo1Ready(false);
      setVideo2FadingOut(false);
      video2FadeTriggeredRef.current = false;
    } else {
      if (video1Ref.current) video1Ref.current.pause();
      if (video2Ref.current) video2Ref.current.pause();
      setVideo1Ready(false);
      setVideo2Ready(false);
    }
  }, [activeVideo]);

  const handleVideo1Ended = () => {
    setActiveVideo(0);
    // Schedule video 2 ~10 s after video 1 finishes
    timersRef.current.push(setTimeout(() => setActiveVideo(2), 10000));
  };

  const handleVideo2Ended = () => {
    setActiveVideo(0);
  };

  // Begin fade-out 2 s before each video ends so the transition is well under
  // way by the time playback reaches the final frame. Refs guard against
  // redundant setState calls across multiple timeupdate firings.
  const handleVideo1TimeUpdate = () => {
    const v = video1Ref.current;
    if (!video1FadeTriggeredRef.current && v && v.duration && v.currentTime >= v.duration - 2) {
      video1FadeTriggeredRef.current = true;
      setVideo1FadingOut(true);
    }
  };

  const handleVideo2TimeUpdate = () => {
    const v = video2Ref.current;
    if (!video2FadeTriggeredRef.current && v && v.duration && v.currentTime >= v.duration - 2) {
      video2FadeTriggeredRef.current = true;
      setVideo2FadingOut(true);
    }
  };

  const video1Visible = activeVideo === 1 && video1Ready && !video1Failed && !video1FadingOut;
  const video2Visible = activeVideo === 2 && video2Ready && !video2Failed && !video2FadingOut;

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
      {/* Full-bleed video 1 background — fades in at 400 ms, fades out when video ends */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          opacity: video1Visible ? 1 : 0,
          transition: video1Visible ? 'opacity 0.8s ease-in' : 'opacity 2s ease-out',
          willChange: 'opacity',
          pointerEvents: 'none',
        }}
      >
        <video
          ref={video1Ref}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
          onPlaying={() => setVideo1Ready(true)}
          onTimeUpdate={handleVideo1TimeUpdate}
          onEnded={handleVideo1Ended}
          onError={() => setVideo1Failed(true)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Warm colour overlay for palette cohesion — slightly stronger for text contrast */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(247,241,231,0.28)' }}
        />

        {/* Centred gradient scrim — brightens the text area without dimming full video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(247,241,231,0.35) 0%, rgba(247,241,231,0) 100%)',
          }}
        />

        {/* Soft vignette to frame the centre during video phase */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(247,241,231,0) 0%, rgba(247,241,231,0.5) 100%)',
          }}
        />
      </div>

      {/* Full-bleed video 2 background — fades in ~10 s after video 1 ends */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          opacity: video2Visible ? 1 : 0,
          transition: video2Visible ? 'opacity 0.8s ease-in' : 'opacity 2s ease-out',
          willChange: 'opacity',
          pointerEvents: 'none',
        }}
      >
        <video
          ref={video2Ref}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
          onPlaying={() => setVideo2Ready(true)}
          onTimeUpdate={handleVideo2TimeUpdate}
          onEnded={handleVideo2Ended}
          onError={() => setVideo2Failed(true)}
        >
          <source src="/hero-video2.mp4" type="video/mp4" />
        </video>

        {/* Warm colour overlay for palette cohesion — slightly stronger for text contrast */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(247,241,231,0.28)' }}
        />

        {/* Centred gradient scrim — brightens the text area without dimming full video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(247,241,231,0.35) 0%, rgba(247,241,231,0) 100%)',
          }}
        />

        {/* Soft vignette to frame the centre during video phase */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(247,241,231,0) 0%, rgba(247,241,231,0.5) 100%)',
          }}
        />
      </div>

      {/* Permanent bottom blend — seamless cut into the Store section below */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        aria-hidden="true"
        style={{
          height: '120px',
          background: 'linear-gradient(to top, #F7F1E7 0%, transparent 100%)',
        }}
      />

      {/* React text content — always visible, overlaid on the video.
          Stagger entrance animations play live over the video footage.
          At 5s the video fades away; the React layer is already in place. */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Ornamental mark above headline */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="block h-px w-10 bg-chlo-tan opacity-60" />
          <span
            className="text-chlo-tan opacity-70 text-xs tracking-[0.35em] uppercase font-light select-none"
            style={{ textShadow: '0 1px 6px rgba(247,241,231,0.9)' }}
          >
            Luxury Cosmetics
          </span>
          <span className="block h-px w-10 bg-chlo-tan opacity-60" />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.28 }}
          className="text-7xl sm:text-8xl md:text-[10rem] font-bold tracking-[-0.02em] text-chlo-brown leading-none"
          style={{ fontFamily: 'var(--font-playfair)', textShadow: '0 2px 24px rgba(247,241,231,0.85), 0 1px 8px rgba(247,241,231,0.6)' }}
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
          style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', textShadow: '0 1px 12px rgba(247,241,231,0.95)' }}
        >
          Effortless beauty, elevated.
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.82 }}
          className="text-base text-chlo-muted mt-5 max-w-lg leading-relaxed"
          style={{ textShadow: '0 1px 8px rgba(247,241,231,0.9)' }}
        >
          Luxury cosmetics crafted with clean formulas and a passion for confidence.
          Discover beauty that feels as good as it looks.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.02 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
          style={{ filter: 'drop-shadow(0 2px 12px rgba(247,241,231,0.7))' }}
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
            style={{
              borderColor: '#3B2F2A',
              color: '#3B2F2A',
              letterSpacing: '0.12em',
              backgroundColor: 'rgba(247,241,231,0.55)',
              backdropFilter: 'blur(4px)',
            }}
          >
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll chevron */}
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