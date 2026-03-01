'use client';

import Image from 'next/image';
import React from 'react';

type Stroke = {
  src: string;
  top: string;
  translateX: string;
  rotateDeg: number;
  opacity: number;
  scale: number;
  driftClass: string;
  revealClass: string;
  flipY?: boolean;
  filter?: string;
};

export default function PhotorealBrushStrokes() {
  const strokes: Stroke[] = [
    // Stroke 1 — champagne-gold, shifted slightly left, angled gently up-right
    {
      src: '/stroke_1.webp', top: '4%', translateX: '-52%', rotateDeg: -6,
      opacity: 0.90, scale: 1.22, driftClass: 'driftA', revealClass: 'revealA',
    },
    // Stroke 2 — blush-rose, shifted slightly right, gentle counter-tilt
    {
      src: '/stroke_2.webp', top: '36%', translateX: '-48%', rotateDeg: 4,
      opacity: 0.80, scale: 1.18, driftClass: 'driftB', revealClass: 'revealB',
    },
    // Stroke 3 — warm taupe, shifted left again, subtle angle
    {
      src: '/stroke_3.webp', top: '64%', translateX: '-51%', rotateDeg: -2,
      opacity: 0.74, scale: 1.15, driftClass: 'driftC', revealClass: 'revealC',
    },
    // Stroke 4 — depth layer: stroke_1 flipped vertically, lower opacity, creates mid-ground layering
    {
      src: '/stroke_1.webp', top: '20%', translateX: '-46%', rotateDeg: 8,
      opacity: 0.38, scale: 1.10, driftClass: 'driftD', revealClass: 'revealD',
      flipY: true, filter: 'brightness(1.08) saturate(0.75) blur(1px)',
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* ── Brush strokes (rendered first, underneath the gradient veil) ── */}
      {strokes.map((s, i) => (
        <div
          key={`${s.src}-${i}`}
          className={`absolute max-w-none ${s.revealClass}`}
          style={{
            top: s.top,
            left: '50%',
            width: '128vw',
            transform: `translateX(${s.translateX}) rotate(${s.rotateDeg}deg) scale(${s.scale})`,
            opacity: s.opacity,
          }}
        >
          {/* Inner wrapper: drift float + optional breathe pulse */}
          <div className={`w-full ${s.driftClass}`} style={{ willChange: 'transform' }}>
            <Image
              src={s.src}
              alt=""
              width={2600}
              height={900}
              priority={i < 2}
              className={`h-auto w-full select-none${s.flipY ? ' flipY' : ''}`}
              style={s.filter ? { filter: s.filter } : undefined}
            />
          </div>
        </div>
      ))}

      {/* ── Gradient veil — sits ON TOP of strokes, protects the text centre ── */}
      {/* Slightly deeper fade-out at edges keeps peripheral strokes visible   */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 64% at 50% 50%, ' +
            'rgba(247,241,231,0.74) 0%, ' +
            'rgba(247,241,231,0.46) 36%, ' +
            'rgba(247,241,231,0.16) 62%, ' +
            'rgba(247,241,231,0.00) 100%)',
        }}
      />

      {/* ── Gloss sheen sweep — slow diagonal light pass, luxury finish ── */}
      <div className="absolute inset-0 sheen-sweep" />

      {/* ── Luxury film grain — topmost layer ── */}
      <div className="absolute inset-0 opacity-[0.045] mix-blend-multiply grain" />

      <style jsx>{`
        /* Fine film grain via SVG turbulence */
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23g)' opacity='.30'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        /* Flip depth stroke vertically */
        .flipY { transform: scaleY(-1); }

        /* ── Gloss sheen: a diagonal highlight that drifts slowly across ── */
        @keyframes sheenMove {
          0%   { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
        .sheen-sweep {
          background: linear-gradient(
            105deg,
            transparent 38%,
            rgba(255, 248, 235, 0.11) 48%,
            rgba(255, 252, 244, 0.18) 52%,
            rgba(255, 248, 235, 0.11) 56%,
            transparent 64%
          );
          animation: sheenMove 9s ease-in-out infinite;
          animation-delay: 2.2s;
          mix-blend-mode: screen;
        }

        /* ── Reveal animations — one-shot entry, each stroke "settles in" ── */
        @keyframes revealSlide {
          0%   { opacity: 0; clip-path: inset(0 100% 0 0); }
          100% { opacity: 1; clip-path: inset(0 0% 0 0); }
        }

        .revealA { animation: revealSlide 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both; }
        .revealB { animation: revealSlide 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both; }
        .revealC { animation: revealSlide 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.90s both; }
        .revealD { animation: revealSlide 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both; }

        /* ── Drift animations — translate3d + subtle rotation, no fight with parent ── */
        @keyframes driftA {
          0%   { transform: translate3d(0,      0,    0) rotate(0deg); }
          22%  { transform: translate3d(-1.1%,  0.6%, 0) rotate(-0.5deg); }
          48%  { transform: translate3d( 0.5%,  1.0%, 0) rotate( 0.4deg); }
          74%  { transform: translate3d(-0.6%,  0.4%, 0) rotate(-0.3deg); }
          100% { transform: translate3d(0,      0,    0) rotate(0deg); }
        }
        @keyframes driftB {
          0%   { transform: translate3d(0,      0,    0) rotate(0deg); }
          30%  { transform: translate3d( 1.0%, -0.6%, 0) rotate( 0.6deg); }
          58%  { transform: translate3d(-0.5%,  0.8%, 0) rotate(-0.4deg); }
          80%  { transform: translate3d( 0.7%, -0.4%, 0) rotate( 0.3deg); }
          100% { transform: translate3d(0,      0,    0) rotate(0deg); }
        }
        @keyframes driftC {
          0%   { transform: translate3d(0,      0,    0) rotate(0deg); }
          28%  { transform: translate3d(-0.8%, -0.5%, 0) rotate(-0.4deg); }
          55%  { transform: translate3d( 0.6%,  0.7%, 0) rotate( 0.5deg); }
          80%  { transform: translate3d(-0.7%,  0.3%, 0) rotate(-0.3deg); }
          100% { transform: translate3d(0,      0,    0) rotate(0deg); }
        }
        @keyframes driftD {
          0%   { transform: translate3d(0,      0,    0) rotate(0deg); }
          35%  { transform: translate3d( 0.9%,  0.4%, 0) rotate( 0.4deg); }
          65%  { transform: translate3d(-0.5%, -0.6%, 0) rotate(-0.5deg); }
          85%  { transform: translate3d( 0.4%,  0.3%, 0) rotate( 0.2deg); }
          100% { transform: translate3d(0,      0,    0) rotate(0deg); }
        }

        .driftA { animation: driftA 20s ease-in-out infinite; }
        .driftB { animation: driftB 24s ease-in-out infinite; animation-delay: -7s; }
        .driftC { animation: driftC 28s ease-in-out infinite; animation-delay: -14s; }
        .driftD { animation: driftD 16s ease-in-out infinite; animation-delay: -4s; }

        @media (prefers-reduced-motion: reduce) {
          .driftA, .driftB, .driftC, .driftD { animation: none !important; }
          .revealA, .revealB, .revealC, .revealD { animation: none !important; clip-path: none !important; }
          .sheen-sweep { animation: none !important; display: none; }
        }
      `}</style>
    </div>
  );
}
