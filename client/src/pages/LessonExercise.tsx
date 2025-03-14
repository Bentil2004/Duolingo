import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { X, Heart } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import MultipleChoiceExercise from "@/components/exercises/MultipleChoiceExercise";
import MatchingExercise from "@/components/exercises/MatchingExercise";
import FillBlankExercise from "@/components/exercises/FillBlankExercise";
import { Exercise } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const LessonExercise = () => {
  const { language, lessonId } = useParams();
  const { 
    getLanguageProgress, 
    getExercises, 
    currentExerciseIndex, 
    completeExercise,
    currentExerciseCount,
    resetExerciseProgress
  } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Convert lessonId to number
  const lessonIdNum = parseInt(lessonId, 10);
  
  // Get exercises for this lesson
  const exercises = getExercises(language, lessonIdNum);
  
  // Get language progress
  const progress = getLanguageProgress(language);
  
  useEffect(() => {
    // Reset exercise progress when component mounts
    resetExerciseProgress();
    
    // When we reach the end of exercises, go to completion page
    if (currentExerciseIndex >= exercises.length && exercises.length > 0) {
      setLocation(`/completion/${language}/${lessonId}`);
    }
  }, [currentExerciseIndex, exercises.length, language, lessonId, resetExerciseProgress, setLocation]);
  
  const handleExitLesson = () => {
    resetExerciseProgress();
    setLocation(`/lessons/${language}`);
  };
  
  const handleCompleteExercise = (isCorrect: boolean) => {
    if (currentExerciseIndex < exercises.length) {
      completeExercise(language, lessonIdNum, exercises[currentExerciseIndex].id, isCorrect);
    }
  };
  
  // If no exercises or loading
  if (!exercises.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading exercises...</h2>
          <button 
            onClick={handleExitLesson}
            className="text-primary hover:underline"
          >
            Back to lessons
          </button>
        </div>
      </div>
    );
  }
  
  // Calculate progress percentage
  const progressPercent = ((currentExerciseIndex + 1) / currentExerciseCount) * 100;
  
  // Get current exercise
  const currentExercise: Exercise = exercises[currentExerciseIndex];
  
  return (
    <section className="py-4 px-4 container mx-auto max-w-3xl">
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handleExitLesson} 
            className="text-neutral-700 hover:text-primary transition"
            aria-label="Exit lesson"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="text-accent mr-1">
                <Heart className="h-5 w-5" />
              </div>
              <span className="font-bold">{progress.hearts}</span>
            </div>
            
            <div className="w-32">
              <ProgressBar progress={progressPercent} height={12} />
            </div>
            
            <span className="text-sm">{currentExerciseIndex + 1}/{currentExerciseCount}</span>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentExercise.type === 'multiple-choice' && (
              <MultipleChoiceExercise 
                exercise={currentExercise} 
                onComplete={handleCompleteExercise} 
              />
            )}
            
            {currentExercise.type === 'matching' && (
              <MatchingExercise 
                exercise={currentExercise} 
                onComplete={handleCompleteExercise} 
              />
            )}
            
            {currentExercise.type === 'fill-blank' && (
              <FillBlankExercise 
                exercise={currentExercise} 
                onComplete={handleCompleteExercise} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LessonExercise;
