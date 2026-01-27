import { useEffect, useState } from "react";

const createStars = () => {
  const area = window.innerWidth * window.innerHeight;

  // Keep it light so CSS animations never "freeze" on load.
  const count = Math.min(180, Math.max(30, Math.floor(area / 20000)));

  const next = [];
  for (let i = 0; i < count; i++) {
    next.push({
      id: i,
      size: Math.random() * 2.5 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.45 + 0.35,
      animationDuration: Math.random() * 4 + 3,
    });
  }
  return next;
};

const createMeteors = () => {
  const count = 4;
  const next = [];
  for (let i = 0; i < count; i++) {
    const animationDuration = Math.random() * 3 + 3; // 3s - 6s
    next.push({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 25,
      // Negative delay = start mid-animation immediately (no "freeze" on load)
      delay: -Math.random() * animationDuration,
      animationDuration,
    });
  }
  return next;
};

export function StarBackground() {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    // Meteors first (light), so "falling lines" start instantly.
    setMeteors(createMeteors());

    // Stars are heavier; generate when the browser is idle to avoid jank.
    let idleId;
    const scheduleStars = () => {
      setStars(createStars());
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(scheduleStars, { timeout: 800 });
    } else {
      idleId = window.setTimeout(scheduleStars, 50);
    }

    // Debounce resize: resize can fire repeatedly on load (mobile address bar, etc.)
    let resizeTimer;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setStars(createStars());
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 50}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
}
