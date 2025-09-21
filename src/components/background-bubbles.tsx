"use client";
import * as React from "react";

// Animated colorful circles in the background
// Uses brand palette with varying opacities and random sizes/positions.

type Bubble = {
  id: number;
  size: number; // px
  top: string; // percentage string
  left: string; // percentage string
  color: string; // css color
  duration: number; // seconds
  delay: number; // seconds
};

const COLORS = [
  "rgba(220,20,60,0.18)", // #DC143C
  "rgba(247,82,112,0.16)", // #F75270
  "rgba(247,202,201,0.22)", // #F7CAC9
  "rgba(253,235,208,0.22)", // #FDEBD0
];

export function BackgroundBubbles({ count = 14 }: { count?: number }) {
  const [bubbles, setBubbles] = React.useState<Bubble[]>([]);

  React.useEffect(() => {
    const next: Bubble[] = Array.from({ length: count }).map((_, i) => {
      const size = Math.floor(80 + Math.random() * 240); // 80-320px
      const top = `${Math.floor(Math.random() * 90)}%`;
      const left = `${Math.floor(Math.random() * 90)}%`;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const duration = 8 + Math.random() * 10; // 8-18s
      const delay = Math.random() * 4; // 0-4s
      return { id: i, size, top, left, color, duration, delay };
    });
    setBubbles(next);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
            animation: `float ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
          className="absolute rounded-full blur-2xl"
        />
      ))}
    </div>
  );
}
