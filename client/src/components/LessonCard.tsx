import { Lesson } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Lock } from "lucide-react";
import { useLocation } from "wouter";
import ProgressBar from "./ProgressBar";

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
  
  return (
    <div 
      className={`
        bg-gray-50 rounded-lg p-4 
        ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}
      `}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-bold">{lesson.title}</span>
        <div className={`
          rounded-full w-8 h-8 flex items-center justify-center
          ${lesson.isCompleted 
            ? 'bg-primary text-white' 
            : lesson.isLocked 
              ? 'bg-gray-300' 
              : 'bg-gray-300'
          }
        `}>
          {lesson.isCompleted ? (
            <Check className="h-5 w-5" />
          ) : lesson.isLocked ? (
            <Lock className="h-5 w-5 text-gray-600" />
          ) : (
            <span className="text-gray-600 font-bold">{lesson.id}</span>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
      <ProgressBar progress={lesson.progress} />
    </div>
  );
};

export default LessonCard;
