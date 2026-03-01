'use client';

import Image from 'next/image';
import React from 'react';

type Stroke = {
  src: string;
  top: string;
  rotateDeg: number;
  opacity: number;
  scale: number;
  blurPx: number;
  animClass: string;
};

export default function PhotorealBrushStrokes() {
  // Real photographed strokes with alpha in /public
  const strokes: Stroke[] = [
    { src: '/stroke_1.webp', top: '10%', rotateDeg: -7, opacity: 0.62, scale: 1.18, blurPx: 0.15, animClass: 'floatA' },
    { src: '/stroke_2.webp', top: '38%', rotateDeg:  3, opacity: 0.52, scale: 1.16, blurPx: 0.12, animClass: 'floatB' },
    { src: '/stroke_3.webp', top: '66%', rotateDeg: -2, opacity: 0.46, scale: 1.14, blurPx: 0.10, animClass: 'floatC' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Center protection for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,241,231,0)_0%,rgba(247,241,231,0.45)_58%,rgba(247,241,231,0.78)_100%)]" />

      {/* Very subtle grain (luxury film texture) */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply grain" />

      {strokes.map((s, i) => (
        <div
          key={s.src}
          className="absolute left-1/2 max-w-none"
          style={{
            top: s.top,
            width: '125vw',
            transform: `translateX(-50%) rotate(${s.rotateDeg}deg) scale(${s.scale})`,
            opacity: s.opacity,
            filter: s.blurPx > 0 ? `blur(${s.blurPx}px)` : 'none',
          }}
        >
          <Image
            src={s.src}
            alt=""
            width={2600}
            height={1000}
            priority={i === 0}
            className={`h-auto w-full select-none ${s.animClass}`}
          />
        </div>
      ))}

      <style jsx>{`
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.33'/%3E%3C/svg%3E");
          background-size: 220px 220px;
        }
        @keyframes floatA {
          0% { transform: translateX(-50%) rotate(-7deg) scale(1.18) translate3d(0,0,0); }
          50% { transform: translateX(-50%) rotate(-7deg) scale(1.19) translate3d(-1.0%,0.6%,0); }
          100% { transform: translateX(-50%) rotate(-7deg) scale(1.18) translate3d(0,0,0); }
        }
        @keyframes floatB {
          0% { transform: translateX(-50%) rotate(3deg) scale(1.16) translate3d(0,0,0); }
          50% { transform: translateX(-50%) rotate(3deg) scale(1.17) translate3d(1.0%,-0.5%,0); }
          100% { transform: translateX(-50%) rotate(3deg) scale(1.16) translate3d(0,0,0); }
        }
        @keyframes floatC {
          0% { transform: translateX(-50%) rotate(-2deg) scale(1.14) translate3d(0,0,0); }
          50% { transform: translateX(-50%) rotate(-2deg) scale(1.15) translate3d(-0.8%,-0.4%,0); }
          100% { transform: translateX(-50%) rotate(-2deg) scale(1.14) translate3d(0,0,0); }
        }
        .floatA { animation: floatA 12s ease-in-out infinite; }
        .floatB { animation: floatB 14s ease-in-out infinite; }
        .floatC { animation: floatC 16s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .floatA, .floatB, .floatC { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
