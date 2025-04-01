import { Lesson } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Lock, Play, Award } from "lucide-react";
import { useLocation } from "wouter";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";

interface LessonCardProps {
  lesson: Lesson;
  languageId: string;
}

const LessonCard = ({ lesson, languageId }: LessonCardProps) => {
  const { resetExerciseProgress } = useLanguage();
  const [, setLocation] = useLocation();
  
  const handleClick = () => {
    if (lesson.isLocked) return;
    
    resetExerciseProgress();
    setLocation(`/lesson/${languageId}/${lesson.id}`);
  };

  let cardClass = '';
  if (lesson.isLocked) {
    cardClass = 'lesson-card-locked';
  } else if (lesson.isCompleted) {
    cardClass = 'lesson-card-completed';
  } else {
    cardClass = 'lesson-card';
  }
  
  return (
    <motion.div 
      className={cardClass}
      onClick={handleClick}
      whileHover={!lesson.isLocked ? { scale: 1.03 } : {}}
      whileTap={!lesson.isLocked ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold truncate pr-2">{lesson.title}</span>
          
          <div className={`
            rounded-full w-10 h-10 flex items-center justify-center
            ${lesson.isCompleted 
              ? 'bg-primary text-white shadow-sm' 
              : lesson.isLocked 
                ? 'bg-gray-200 border border-gray-300' 
                : 'bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors'
            }
          `}>
            {lesson.isCompleted ? (
              <Check className="h-5 w-5" />
            ) : lesson.isLocked ? (
              <Lock className="h-5 w-5 text-gray-500" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lesson.description}</p>
        
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span className="font-medium">{lesson.progress}%</span>
          </div>
          <ProgressBar progress={lesson.progress} height={8} />
        </div>
        
        {lesson.isCompleted && (
          <div className="mt-3 flex items-center text-xs text-primary font-medium">
            <Award className="h-3 w-3 mr-1" />
            <span>Completed</span>
          </div>
        )}
        
        {!lesson.isLocked && !lesson.isCompleted && (
          <div className="mt-3 flex justify-center">
            <div className="bg-primary/10 rounded-full py-1 px-3 text-xs text-primary font-medium">
              Continue learning
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LessonCard;
