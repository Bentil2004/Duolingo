import { useState } from "react";
import { Volume2, Volume1, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/use-audio";
import { cn } from "@/lib/utils";

export interface AudioButtonProps {
  src?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "ghost" | "primary" | "subtle";
  className?: string;
  showLabel?: boolean;
  label?: string;
  autoPlay?: boolean;
}

const AudioButton = ({
  src,
  size = "md",
  variant = "outline",
  className,
  showLabel = false,
  label = "Listen",
  autoPlay = false,
}: AudioButtonProps) => {
  const [hasAttemptedPlay, setHasAttemptedPlay] = useState(false);
  const { play, stop, isPlaying, isLoaded, error } = useAudio(src);

  // If autoPlay is true, attempt to play once loaded
  if (autoPlay && isLoaded && !hasAttemptedPlay && !isPlaying) {
    play();
    setHasAttemptedPlay(true);
  }

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
      setHasAttemptedPlay(true);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  // Variant classes
  const variantClasses = {
    outline: "border-2 border-primary/20 bg-transparent hover:bg-primary/10 text-primary",
    ghost: "bg-transparent hover:bg-primary/10 text-primary",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    subtle: "bg-primary/10 text-primary hover:bg-primary/20",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        type="button"
        onClick={handleClick}
        disabled={!isLoaded || !!error}
        className={cn(
          "flex items-center justify-center rounded-full p-0 transition-all",
          sizeClasses[size],
          variantClasses[variant]
        )}
        aria-label={isPlaying ? "Stop audio" : "Play audio"}
      >
        {!isLoaded ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isPlaying ? (
          <Volume2 className="h-5 w-5 animate-pulse" />
        ) : error ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume1 className="h-5 w-5" />
        )}
      </Button>
      
      {showLabel && (
        <span className="text-sm font-medium">
          {error ? "Audio unavailable" : label}
        </span>
      )}
    </div>
  );
};

export default AudioButton;