"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    title: "Start Your Adventure",
    subtitle: "in Stunning Places",
    description:
      "Start your adventure in stunning places and make unforgettable memories. Discover beautiful landscapes and unique cultures with ease.",
    // word: "MOUNTAIN",
    bg: "/6.png",
    thumb1:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&q=80",
    thumb2:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
  {
    id: 2,
    title: "Explore Hidden",
    subtitle: "Valleys & Peaks",
    description:
      "Journey through untouched wilderness and discover the raw beauty of nature. Every step reveals breathtaking panoramas and serene solitude.",
    // word: "GLACIER",
    bg: "2.png",
    thumb1:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
    thumb2:
      "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=400&q=80",
  },
  {
    id: 3,
    title: "Summit the World's",
    subtitle: "Greatest Peaks",
    description:
      "Challenge yourself with world-class alpine routes. Our expert guides ensure a safe, transformative experience you will never forget.",
    // word: "SUMMIT",
    bg: "3.png",
    thumb1:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&q=80",
    thumb2:
      "https://images.unsplash.com/photo-1520208422220-d12a3be9b343?w=400&q=80",
  },
  {
    id: 4,
    title: "Trek Through",
    subtitle: "Ancient Trails",
    description:
      "Walk paths carved by centuries of explorers. Connect with nature on a deeper level as you traverse legendary routes across the world.",
    // word: "TREKKING",  
    bg: "4.png",
    thumb1:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
    thumb2:
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=400&q=80",
  },
  {
    id: 5,
    title: "Discover Remote",
    subtitle: "Wilderness Escapes",
    description:
      "Venture beyond the beaten path into pristine wilderness. Experience the silence, the stars, and the soul of our planet's most remote corners.",
    // word: "WILDNESS",
    bg: "5.png",
    thumb1:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
    thumb2:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&q=80",
  },
];

export default function MountainHero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (animating) return;
      setAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 600);
    },
    [animating],
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div className="relative w-full h-screen min-h-[500px] overflow-hidden bg-black font-sans">
      {/* ── Background Image ── */}
      <div
        key={`bg-${current}`}
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${slide.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: animating
            ? direction === "next"
              ? "slideInRight 0.7s ease forwards"
              : "slideInLeft 0.7s ease forwards"
            : "none",
        }}
      />

      {/* ── Dark Gradient Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* ── Giant Background Word ── */}
      <div
        key={`word-${current}`}
        className="absolute top-0 left-0 right-0 flex items-start justify-center pointer-events-none select-none overflow-hidden"
        style={{ animation: "fadeWordIn 0.8s ease forwards" }}
      >
        <span
          className="text-white/10 font-black tracking-widest leading-none"
          style={{
            fontSize: "clamp(80px, 18vw, 200px)",
            fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
            letterSpacing: "0.05em",
            lineHeight: 0.9,
            WebkitTextStroke: "1px rgba(255,255,255,0.15)",
          }}
        >
          {slide.word}
        </span>
      </div>

    
      {/* ── Main Content ── */}
      <main className="absolute inset-0 flex flex-col justify-end pb-16 sm:pb-10 px-6 sm:px-10 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left: Text Content */}
          <div className="flex-1 max-w-lg">
            {/* Badge */}
            <div
              key={`badge-${current}`}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5"
              style={{ animation: "fadeUpIn 0.6s 0.1s ease both" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-white/90 text-xs font-medium tracking-widest">
                Travel Experience Center
              </span>
            </div>

            {/* Title */}
            <h1
              key={`title-${current}`}
              className="text-white font-black leading-tight mb-4"
              style={{
                fontSize: "clamp(32px, 5vw, 60px)",
                fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
                fontWeight: 900,
                letterSpacing: "0.01em",
                animation: "fadeUpIn 0.6s 0.2s ease both",
              }}
            >
              {slide.title}
              <br />
              <span className="text-white">{slide.subtitle}</span>
            </h1>

            {/* Description */}
            <p
              key={`desc-${current}`}
              className="text-white/70 text-sm sm:text-base leading-relaxed mb-7 max-w-sm"
              style={{ animation: "fadeUpIn 0.6s 0.35s ease both" }}
            >
              {slide.description}
            </p>

            {/* CTA Button */}
            <button
              key={`btn-${current}`}
              className="bg-white text-black font-bold px-7 py-3.5 rounded-full text-sm tracking-wider hover:bg-white/90 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
              style={{ animation: "fadeUpIn 0.6s 0.45s ease both" }}
            >
              Plan Your Adventure
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5-5 5M6 12h12"
                />
              </svg>
            </button>
          </div>

          {/* Right: Thumbnail Slider + Controls */}
          <div className="flex flex-col items-end gap-4">
            {/* Thumbnails */}
            <div className="flex items-center gap-3">
              {/* Thumb 1 */}
              <div
                key={`t1-${current}`}
                className="relative overflow-hidden rounded-xl shadow-2xl border border-white/20"
                style={{
                  width: "clamp(120px, 18vw, 180px)",
                  height: "clamp(80px, 12vw, 120px)",
                  animation: "fadeUpIn 0.6s 0.3s ease both",
                }}
              >
                <img
                  src={slide.thumb1}
                  alt="destination"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Thumb 2 */}
              <div
                key={`t2-${current}`}
                className="relative overflow-hidden rounded-xl shadow-2xl border border-white/20"
                style={{
                  width: "clamp(100px, 15vw, 150px)",
                  height: "clamp(70px, 10vw, 100px)",
                  animation: "fadeUpIn 0.6s 0.4s ease both",
                }}
              >
                <img
                  src={slide.thumb2}
                  alt="destination"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>

            {/* Slide Counter + Arrows */}
            <div className="flex items-center gap-4">
              {/* Counter */}
              <div className="text-white flex items-baseline gap-1">
                <span
                  className="font-black"
                  style={{
                    fontSize: "clamp(22px, 4vw, 36px)",
                    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                  }}
                >
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span className="text-white/40 text-sm font-medium">
                  /{String(slides.length).padStart(2, "0")}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-16 sm:w-24 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${((current + 1) / slides.length) * 100}%` }}
                />
              </div>

              {/* Arrow Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  disabled={animating}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200 disabled:opacity-50 active:scale-90"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  disabled={animating}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-white/90 transition-all duration-200 disabled:opacity-50 active:scale-90 shadow-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Dot Indicators ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ── CSS Animations ── */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

        @keyframes fadeUpIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeWordIn {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px) scale(1.05);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px) scale(1.05);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
