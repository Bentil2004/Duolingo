import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  height?: number;
  className?: string;
  showAnimation?: boolean;
}

const ProgressBar = ({ 
  progress, 
  height = 12, 
  className = "",
  showAnimation = true
}: ProgressBarProps) => {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  
  // Calculate color based on progress
  let progressColor = 'bg-primary';
  if (safeProgress >= 100) {
    progressColor = 'bg-green-500';
  } else if (safeProgress < 20) {
    progressColor = 'bg-primary/70';
  }
  
  return (
    <div 
      className={`relative bg-gray-200 rounded-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      {showAnimation ? (
        <motion.div 
          className={`absolute top-0 left-0 h-full ${progressColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ) : (
        <div 
          className={`absolute top-0 left-0 h-full ${progressColor} transition-all duration-500 ease-out`}
          style={{ width: `${safeProgress}%` }}
        />
      )}
      
      {/* Add subtle gradient overlay */}
      <div 
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white/5 to-black/5"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
