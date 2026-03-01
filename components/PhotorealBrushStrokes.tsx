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
};

export default function PhotorealBrushStrokes() {
  const strokes: Stroke[] = [
    // Stroke 1 — champagne-gold, shifted slightly left, angled gently up-right
    { src: '/stroke_1.webp', top: '6%',  translateX: '-52%', rotateDeg: -6,  opacity: 0.70, scale: 1.20, driftClass: 'driftA' },
    // Stroke 2 — blush-rose, shifted slightly right, gentle counter-tilt
    { src: '/stroke_2.webp', top: '37%', translateX: '-48%', rotateDeg:  4,  opacity: 0.60, scale: 1.16, driftClass: 'driftB' },
    // Stroke 3 — warm taupe, shifted left again, subtle angle
    { src: '/stroke_3.webp', top: '65%', translateX: '-51%', rotateDeg: -2,  opacity: 0.54, scale: 1.14, driftClass: 'driftC' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* ── Brush strokes (rendered first, underneath the gradient veil) ── */}
      {strokes.map((s, i) => (
        <div
          key={s.src}
          className="absolute max-w-none"
          style={{
            top: s.top,
            left: '50%',
            width: '128vw',
            transform: `translateX(${s.translateX}) rotate(${s.rotateDeg}deg) scale(${s.scale})`,
            opacity: s.opacity,
            willChange: 'transform',
          }}
        >
          {/* Separate inner wrapper carries ONLY the floating drift animation */}
          <div className={`w-full ${s.driftClass}`}>
            <Image
              src={s.src}
              alt=""
              width={2600}
              height={800}
              priority={i === 0}
              className="h-auto w-full select-none"
            />
          </div>
        </div>
      ))}

      {/* ── Gradient veil — sits ON TOP of strokes, protects the text centre ── */}
      {/* Ellipse is taller than wide so the vertical centre strip is clearest */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 50%, ' +
            'rgba(247,241,231,0.82) 0%, ' +
            'rgba(247,241,231,0.52) 38%, ' +
            'rgba(247,241,231,0.18) 65%, ' +
            'rgba(247,241,231,0.00) 100%)',
        }}
      />

      {/* ── Luxury film grain — topmost layer ── */}
      <div className="absolute inset-0 opacity-[0.045] mix-blend-multiply grain" />

      <style jsx>{`
        /* Fine film grain via SVG turbulence */
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23g)' opacity='.30'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        /* Drift animations — only translate3d so they don't fight the outer
           transform (rotate + scale) set inline on the parent div.          */
        @keyframes driftA {
          0%   { transform: translate3d(0,     0,    0); }
          28%  { transform: translate3d(-0.9%, 0.5%, 0); }
          55%  { transform: translate3d( 0.4%, 0.8%, 0); }
          78%  { transform: translate3d(-0.5%, 0.3%, 0); }
          100% { transform: translate3d(0,     0,    0); }
        }
        @keyframes driftB {
          0%   { transform: translate3d(0,     0,    0); }
          35%  { transform: translate3d( 0.8%,-0.5%, 0); }
          60%  { transform: translate3d(-0.4%, 0.7%, 0); }
          80%  { transform: translate3d( 0.6%,-0.3%, 0); }
          100% { transform: translate3d(0,     0,    0); }
        }
        @keyframes driftC {
          0%   { transform: translate3d(0,     0,    0); }
          32%  { transform: translate3d(-0.7%,-0.4%, 0); }
          58%  { transform: translate3d( 0.5%, 0.6%, 0); }
          82%  { transform: translate3d(-0.6%, 0.2%, 0); }
          100% { transform: translate3d(0,     0,    0); }
        }

        .driftA { animation: driftA 18s ease-in-out infinite; }
        .driftB { animation: driftB 22s ease-in-out infinite; animation-delay: -6s; }
        .driftC { animation: driftC 26s ease-in-out infinite; animation-delay: -12s; }

        @media (prefers-reduced-motion: reduce) {
          .driftA, .driftB, .driftC { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
