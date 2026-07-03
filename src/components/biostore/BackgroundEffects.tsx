"use client";

import React, { useEffect, useState } from "react";

function generateBubbles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 20 + (i * 17 % 40),
    left: (i * 7 % 100),
    duration: 10 + (i * 3 % 10),
    delay: i * 0.7 % 10,
  }));
}

function generateSnow(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 2 + (i * 3 % 5),
    left: (i * 3.3 % 100),
    duration: 5 + (i * 2 % 5),
    delay: i * 0.3 % 5,
    drift: (i % 2 === 0 ? 1 : -1) * (i * 7 % 50),
  }));
}

export function BackgroundEffects({
  effect,
  themeData,
}: {
  effect?: string;
  themeData?: any;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted || !effect || effect === "none") return null;

  const textColor = themeData?.colors?.textColor || "#000000";
  const bubbles = generateBubbles(15);
  const snowflakes = generateSnow(30);

  if (effect === "bubbles") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left}%`,
              bottom: `-${b.size + 10}px`,
              backgroundColor: textColor,
              opacity: 0.12,
              animation: `bio-bubble-up ${b.duration}s linear ${b.delay}s infinite`,
            }}
          />
        ))}
        <style>{`
          @keyframes bio-bubble-up {
            0% { transform: translateY(0) scale(1); opacity: 0.15; }
            80% { opacity: 0.08; }
            100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  if (effect === "blobs") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: "50%",
            height: "50%",
            top: "-10%",
            left: "-10%",
            backgroundColor: textColor,
            opacity: 0.08,
            animation: "bio-blob 12s infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "40%",
            height: "60%",
            top: "20%",
            right: "-10%",
            backgroundColor: textColor,
            opacity: 0.06,
            animation: "bio-blob 14s 2s infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: "60%",
            height: "50%",
            bottom: "-10%",
            left: "20%",
            backgroundColor: textColor,
            opacity: 0.07,
            animation: "bio-blob 16s 4s infinite alternate",
          }}
        />
        <style>{`
          @keyframes bio-blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `}</style>
      </div>
    );
  }

  if (effect === "grid") {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        style={{ opacity: 0.12 }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${textColor} 1px, transparent 1px), linear-gradient(90deg, ${textColor} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            animation: "bio-grid 8s linear infinite",
          }}
        />
        <style>{`
          @keyframes bio-grid {
            0% { background-position: 0 0; }
            100% { background-position: 0 40px; }
          }
        `}</style>
      </div>
    );
  }

  if (effect === "snow") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {snowflakes.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              width: s.size,
              height: s.size,
              left: `${s.left}%`,
              top: `-${s.size + 5}px`,
              backgroundColor: textColor,
              opacity: 0.5,
              animation: `bio-snow-fall-${s.id} ${s.duration}s linear ${s.delay}s infinite`,
            }}
          />
        ))}
        <style>{snowflakes.map((s) => `
          @keyframes bio-snow-fall-${s.id} {
            0% { transform: translateY(0) translateX(0); opacity: 0.6; }
            100% { transform: translateY(110vh) translateX(${s.drift}px); opacity: 0; }
          }
        `).join('')}</style>
      </div>
    );
  }

  if (effect === 'stars') {
    const stars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      size: 1 + (i * 3 % 3),
      left: (i * 12.7 % 100),
      top: (i * 7.3 % 100),
      duration: 2 + (i * 1.3 % 3),
      delay: i * 0.2 % 4,
    }));
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              width: s.size,
              height: s.size,
              left: `${s.left}%`,
              top: `${s.top}%`,
              opacity: 0.6,
              animation: `bio-star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
            }}
          />
        ))}
        <style>{`
          @keyframes bio-star-twinkle {
            0% { opacity: 0.1; transform: scale(0.8); }
            100% { opacity: 0.9; transform: scale(1.3); }
          }
        `}</style>
      </div>
    );
  }

  if (effect === 'particles') {
    const particles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: 3 + (i * 5 % 8),
      left: (i * 4 % 100),
      duration: 6 + (i * 2 % 8),
      delay: i * 0.4 % 6,
      drift: (i % 2 === 0 ? 1 : -1) * (i * 11 % 80),
    }));
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: `-${p.size}px`,
              backgroundColor: textColor,
              opacity: 0.25,
              animation: `bio-particle-rise-${p.id} ${p.duration}s ease-in ${p.delay}s infinite`,
            }}
          />
        ))}
        <style>{particles.map((p) => `
          @keyframes bio-particle-rise-${p.id} {
            0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
            100% { transform: translateY(-110vh) translateX(${p.drift}px) scale(0.3); opacity: 0; }
          }
        `).join('')}</style>
      </div>
    );
  }

  return null;
}
