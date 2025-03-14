declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  interface ConfettiCannon {
    fire(options?: ConfettiOptions): void;
    reset(): void;
  }

  function confetti(options?: ConfettiOptions): Promise<void>;

  namespace confetti {
    function reset(): void;
    function create(canvas: HTMLCanvasElement, options?: ConfettiOptions): ConfettiCannon;
  }

  export = confetti;
}