interface ProgressBarProps {
  progress: number;
  height?: number;
  className?: string;
}

const ProgressBar = ({ progress, height = 12, className = "" }: ProgressBarProps) => {
  return (
    <div 
      className={`bg-gray-200 rounded-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <div 
        className="bg-primary h-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
