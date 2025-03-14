import { useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { HeartIcon, TrophyIcon, Star } from "lucide-react";

const LessonCompletion = () => {
  const { language, lessonId } = useParams();
  const { 
    getLanguageProgress, 
    completeLesson, 
    correctAnswers, 
    currentExerciseCount,
    resetExerciseProgress
  } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Calculate score (stars) based on correct answers
  const score = Math.ceil((correctAnswers / currentExerciseCount) * 5);
  
  // Convert lessonId to number
  const lessonIdNum = parseInt(lessonId, 10);
  
  // Get language progress
  const progress = getLanguageProgress(language);
  
  useEffect(() => {
    // Complete lesson when component mounts
    completeLesson(language, lessonIdNum, score);
  }, [completeLesson, language, lessonIdNum, score]);
  
  const handleContinue = () => {
    resetExerciseProgress();
    const nextLessonId = lessonIdNum + 1;
    setLocation(`/lesson/${language}/${nextLessonId}`);
  };
  
  const handleBackToLessons = () => {
    resetExerciseProgress();
    setLocation(`/lessons/${language}`);
  };
  
  return (
    <section className="py-8 px-4 container mx-auto max-w-3xl text-center">
      <div className="bg-white rounded-xl p-8 shadow-md mb-6">
        <motion.div 
          className="mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-32 h-32 mx-auto mb-4 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
            <div className="z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <TrophyIcon className="w-16 h-16 text-primary" />
              </motion.div>
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold mb-2">Great job!</h2>
          <p className="text-xl text-gray-600 mb-6">You completed Lesson {lessonId}</p>
          
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center mx-3">
              <TrophyIcon className="text-blue-500 mr-2 h-6 w-6" />
              <span className="font-bold text-xl">+{score * 5}</span>
            </div>
            
            <div className="flex items-center mx-3">
              <div className="flex text-secondary">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: i < score ? 1 : 0.7, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star 
                      className={`h-6 w-6 ${i < score ? 'fill-secondary text-secondary' : 'text-gray-300'}`} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">Your Progress</h3>
            <ProgressBar progress={progress.progress} className="mb-2 mx-auto max-w-sm" />
            <p className="text-sm text-gray-600">{progress.progress}% to next level</p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            className="py-3 px-6 text-center text-lg font-bold rounded-xl bg-primary text-white hover:bg-primary/90"
            onClick={handleContinue}
          >
            Continue
          </Button>
          <Button
            variant="outline"
            className="py-3 px-6 text-center text-lg font-bold rounded-xl bg-secondary text-neutral-700 hover:bg-secondary/90 border-none"
            onClick={handleBackToLessons}
          >
            Back to Lessons
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LessonCompletion;
