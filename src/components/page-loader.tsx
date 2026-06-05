"use client";

import { useEffect, useState, useCallback } from "react";

const bootSequence = [
  { text: "BIOS POST... OK", delay: 0 },
  { text: "Memory check: 32768 MB ... passed", delay: 200 },
  { text: "Loading kernel modules...", delay: 450 },
  { text: "Initializing AXG://PORTFOLIO v1.0.0", delay: 700 },
  { text: "Mounting /dev/projects ... synced", delay: 950 },
  { text: "Network stack online [Baghdad / UTC+03]", delay: 1150 },
  { text: "Decrypting assets ██████████ done", delay: 1350 },
  { text: "All systems nominal. Launching interface...", delay: 1600 },
];

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);

  const dismiss = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => setVisible(false), 600);
  }, []);

  useEffect(() => {
    // Animate boot lines
    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, index + 1));
      }, line.delay);
    });

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerate toward the end
        const increment = prev < 60 ? 2.5 : prev < 85 ? 4 : 6;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    // Auto-dismiss after boot sequence completes
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(dismissTimer);
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      className={`loader-overlay ${fadeOut ? "loader-fade-out" : ""}`}
      aria-label="Page loading"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
    >
      {/* CRT scanlines overlay */}
      <div className="loader-scanlines" />

      {/* Grid background */}
      <div className="loader-grid" />

      <div className="loader-content">
        {/* Glitch logo */}
        <div className="loader-logo" data-text="AXG://SYS">
          AXG://SYS
        </div>

        {/* Boot lines */}
        <div className="loader-terminal">
          {bootSequence.slice(0, visibleLines).map((line, index) => (
            <p
              key={index}
              className="loader-line"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className="loader-line-prefix">
                [{String(index).padStart(2, "0")}]
              </span>{" "}
              {line.text}
            </p>
          ))}
          {visibleLines < bootSequence.length && (
            <span className="loader-cursor">_</span>
          )}
        </div>

        {/* Progress bar */}
        <div className="loader-progress-track">
          <div
            className="loader-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loader-progress-label">
          <span>BOOT SEQUENCE</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
