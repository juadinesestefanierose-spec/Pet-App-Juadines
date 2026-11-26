
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

interface DinosaurProps {
  bounceTrigger: number;
}

function Dinosaur({ bounceTrigger }: DinosaurProps) {
  const walkerRef = useRef<HTMLDivElement>(null);
  const dinosaurRef = useRef<HTMLDivElement>(null);
  const sleepTimeoutRef = useRef<number | null>(null);
  const [sleepTrigger, setSleepTrigger] = useState(0);

  useEffect(() => {
    const walker = walkerRef.current;
    if (!walker) return;

    let position = 0;
    let direction = 1;
    let previousTime = 0;
    let frame = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function walk(time: number) {
      if (!walker) return;

      const maxPosition = Math.max(0, window.innerWidth - walker.offsetWidth);
      position = Math.min(position, maxPosition);

      if (!reducedMotion && maxPosition > 0 && previousTime > 0) {
        const elapsed = Math.min(time - previousTime, 50);
        position += direction * elapsed * 0.035;

        if (position >= maxPosition) {
          position = maxPosition;
          direction = -1;
        } else if (position <= 0) {
          position = 0;
          direction = 1;
        }
      }

      walker.style.left = `${position}px`;
      walker.style.transform = `scaleX(${direction})`;
      previousTime = time;
      frame = window.requestAnimationFrame(walk);
    }

    frame = window.requestAnimationFrame(walk);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const dinosaur = dinosaurRef.current;
    if (!dinosaur || bounceTrigger === 0) return;

    const bounce = dinosaur.animate(
      [
        { transform: "translateY(0) scale(1, 1)" },
        { offset: 0.42, transform: "translateY(-42px) scale(0.94, 1.08)" },
        { offset: 0.72, transform: "translateY(0) scale(1.08, 0.92)" },
        { transform: "translateY(0) scale(1, 1)" },
      ],
      { duration: 620, easing: "cubic-bezier(0.22, 0.8, 0.35, 1)" }
    );

    return () => bounce.cancel();
  }, [bounceTrigger]);

  useEffect(() => {
    const dinosaur = dinosaurRef.current;
    if (!dinosaur || sleepTrigger === 0) return;

    if (sleepTimeoutRef.current !== null) {
      window.clearTimeout(sleepTimeoutRef.current);
    }

    dinosaur.classList.remove("dino-sleeping");
    void dinosaur.offsetWidth;
    dinosaur.classList.add("dino-sleeping");

    sleepTimeoutRef.current = window.setTimeout(() => {
      dinosaur.classList.remove("dino-sleeping");
      sleepTimeoutRef.current = null;
    }, 1600);

    return () => {
      if (sleepTimeoutRef.current !== null) {
        window.clearTimeout(sleepTimeoutRef.current);
        sleepTimeoutRef.current = null;
      }
      dinosaur.classList.remove("dino-sleeping");
    };
  }, [sleepTrigger]);

  function handleSleepClick() {
    setSleepTrigger((trigger) => trigger + 1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSleepClick();
    }
  }

  return (
    <div className="dino-walker" ref={walkerRef}>
      <div
        className="dinosaur"
        ref={dinosaurRef}
        role="button"
        tabIndex={0}
        aria-label="A cute little brown dinosaur"
        onClick={handleSleepClick}
        onKeyDown={handleKeyDown}
      >
        <div className="dino-shadow"></div>

        <div className="dino-body">
          <div className="dino-belly"></div>

          <div className="dino-spots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="dino-spikes">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="dino-tail"></div>

          <div className="dino-head">
            <div className="dino-eye"></div>
            <div className="dino-eye dino-eye-second"></div>
            <div className="dino-cheek"></div>
            <div className="dino-smile"></div>
          </div>

          <div className="dino-leg dino-leg-left"></div>
          <div className="dino-leg dino-leg-right"></div>

          <div className="dino-arm"></div>
        </div>

        <span className="dino-heart">♥</span>
      </div>
    </div>
  );
}

export default Dinosaur;
