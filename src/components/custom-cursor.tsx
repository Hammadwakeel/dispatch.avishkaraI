"use client";

import { useEffect, useState, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add to trail history
      trailRef.current = [
        { x: e.clientX, y: e.clientY, time: Date.now() },
        ...trailRef.current.slice(0, 10),
      ];
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElements = [
        "a",
        "button",
        "[role='button']",
        "input",
        "select",
        "textarea",
        "label",
        "[tabindex]",
        ".clickable",
        "[data-cursor-hover]",
      ];

      const isInteractive = interactiveElements.some((selector) =>
        target.closest(selector)
      );

      setIsHovering(!!isInteractive);
    };

    // Animate trails
    const animateTrails = () => {
      const now = Date.now();
      const filteredTrails = trailRef.current.filter(
        (point) => now - point.time < 200
      );
      trailRef.current = filteredTrails;
      setTrails([...filteredTrails]);

      animationRef.current = requestAnimationFrame(animateTrails);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    animationRef.current = requestAnimationFrame(animateTrails);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`custom-cursor ${isHovering ? "hovering" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Trail cursors */}
      {trails.slice(0, 3).map((point, index) => (
        <div
          key={index}
          className={`cursor-trail trail-${index}`}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
          }}
        />
      ))}
    </>
  );
}