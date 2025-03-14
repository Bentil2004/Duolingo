import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { X, Heart, Trophy, Flag, Volume2 } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import MultipleChoiceExercise from "@/components/exercises/MultipleChoiceExercise";
import MatchingExercise from "@/components/exercises/MatchingExercise";
import FillBlankExercise from "@/components/exercises/FillBlankExercise";
import { Exercise } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { languages } from "@/data/languages";

const LessonExercise = () => {
  const { language, lessonId } = useParams();
  const { 
    getLanguageProgress, 
    getExercises, 
    currentExerciseIndex, 
    completeExercise,
    currentExerciseCount,
    resetExerciseProgress,
    correctAnswers
  } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Convert lessonId to number
  const lessonIdNum = parseInt(lessonId, 10);
  
  // Get language data
  const languageData = languages.find(lang => lang.id === language);
  const languageId = language || '';
  
  // Get exercises for this lesson
  const exercises = getExercises(languageId, lessonIdNum);
  
  // Get language progress
  const progress = getLanguageProgress(languageId);
  
  useEffect(() => {
    // When we reach the end of exercises, go to completion page
    if (currentExerciseIndex >= exercises.length && exercises.length > 0) {
      setLocation(`/completion/${languageId}/${lessonId}`);
    }
  }, [currentExerciseIndex, exercises.length, languageId, lessonId, setLocation]);
  
  const handleExitLesson = () => {
    resetExerciseProgress();
    setLocation(`/lessons/${languageId}`);
  };
  
  const handleCompleteExercise = (isCorrect: boolean) => {
    if (currentExerciseIndex < exercises.length) {
      completeExercise(languageId, lessonIdNum, exercises[currentExerciseIndex].id, isCorrect);
    }
  };
  
  // If no exercises or loading
  if (!exercises.length) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center bg-white p-10 rounded-2xl shadow-md">
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Loading exercises...</h2>
          <p className="text-gray-600 mb-6">Please wait while we prepare your lesson.</p>
          <button 
            onClick={handleExitLesson}
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            <X className="h-5 w-5 mr-2" />
            Cancel and return to lessons
          </button>
        </div>
      </motion.div>
    );
  }
  
  // Calculate progress percentage
  const progressPercent = ((currentExerciseIndex + 1) / currentExerciseCount) * 100;
  
  // Get current exercise
  const currentExercise: Exercise | undefined = exercises[currentExerciseIndex];
  
  // If we have no current exercise, show loading state
  if (!currentExercise) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center bg-white p-10 rounded-2xl shadow-md">
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Loading exercise...</h2>
          <p className="text-gray-600 mb-6">Please wait while we prepare your lesson.</p>
          <button 
            onClick={handleExitLesson}
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            <X className="h-5 w-5 mr-2" />
            Cancel and return to lessons
          </button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.section 
      className="py-6 px-4 container mx-auto max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center">
            <button 
              onClick={handleExitLesson} 
              className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors mr-4"
              aria-label="Exit lesson"
            >
              <X className="h-5 w-5" />
            </button>
            
            {languageData && (
              <div className="flex items-center">
                <img 
                  src={languageData.flag} 
                  alt={`${languageData.name} Flag`} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 mr-3" 
                />
                <div>
                  <h2 className="font-bold text-lg">{languageData.name}</h2>
                  <div className="text-xs text-gray-500">Lesson {lessonId}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-red-50 px-3 py-1 rounded-full">
              <Heart className="h-4 w-4 text-red-500 mr-1" />
              <span className="font-bold text-red-600">{progress.hearts}</span>
            </div>
            
            <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
              <Trophy className="h-4 w-4 text-amber-500 mr-1" />
              <span className="font-bold text-amber-600">+{correctAnswers * 5} XP</span>
            </div>
            
            <button className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors">
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Flag className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <span className="text-sm font-medium">{currentExerciseIndex + 1}/{currentExerciseCount}</span>
          </div>
          
          <ProgressBar 
            progress={progressPercent} 
            height={10} 
            showAnimation={true}
          />
        </div>
        
        <div className="exercise-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-2"
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
      </div>
    </motion.section>
  );
};

export default LessonExercise;
