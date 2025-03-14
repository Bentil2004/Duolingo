import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { Heart, Trophy, Star, Flame, CheckCircle, XCircle, ArrowRight, Award } from "lucide-react";
import confetti from 'canvas-confetti';
import { languages } from "@/data/languages";

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
  
  // Find language data
  const languageData = languages.find(lang => lang.id === language);
  const languageId = language || '';
  
  // Calculate score (stars) based on correct answers
  const scorePercent = (correctAnswers / currentExerciseCount) * 100;
  const score = Math.ceil((correctAnswers / currentExerciseCount) * 5);
  
  // Calculate XP earned
  const xpEarned = correctAnswers * 5;
  
  // Convert lessonId to number
  const lessonIdNum = parseInt(lessonId, 10);
  
  // Get language progress
  const progress = getLanguageProgress(languageId);
  
  useEffect(() => {
    // Complete lesson when component mounts
    completeLesson(languageId, lessonIdNum, score);
    
    // Trigger confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start from the top
      confetti({
        particleCount: Math.floor(randomInRange(20, 50)),
        spread: randomInRange(50, 100),
        origin: { y: 0, x: randomInRange(0.3, 0.7) },
        colors: ['#4CAF50', '#2196F3', '#FFEB3B', '#FF9800', '#E91E63'],
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, [completeLesson, languageId, lessonIdNum, score]);
  
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
    <motion.section 
      className="py-12 px-4 container mx-auto max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg text-center">
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Completion header */}
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6 relative flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 bg-primary/10 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6, times: [0, 0.7, 1] }}
              />
              <motion.div
                className="z-10"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Trophy className="w-16 h-16 text-primary" />
              </motion.div>
            </div>
            
            {/* Language flag */}
            {languageData && (
              <motion.div 
                className="absolute top-0 right-1/2 transform translate-x-20 -translate-y-4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <div className="bg-white p-1 rounded-full shadow-md">
                  <img 
                    src={languageData.flag} 
                    alt={`${languageData.name} Flag`} 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                </div>
              </motion.div>
            )}
          </div>
          
          <motion.h2 
            className="text-4xl font-extrabold mb-2 gradient-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Congratulations!
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You've completed Lesson {lessonId} {languageData ? `in ${languageData.name}` : ''}
          </motion.p>
          
          {/* Stats cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-green-50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                <span className="font-bold text-green-800">Correct</span>
              </div>
              <div className="text-2xl font-bold text-green-700">
                {correctAnswers}/{currentExerciseCount}
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="text-amber-500 mr-2 h-5 w-5" />
                <span className="font-bold text-amber-800">XP Earned</span>
              </div>
              <div className="text-2xl font-bold text-amber-700">+{xpEarned}</div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <Flame className="text-blue-500 mr-2 h-5 w-5" />
                <span className="font-bold text-blue-800">Streak</span>
              </div>
              <div className="text-2xl font-bold text-blue-700">{progress.streak} days</div>
            </div>
          </motion.div>
          
          {/* Star rating */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-bold text-lg mb-3">Your Performance</h3>
            <div className="flex justify-center items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                  >
                    <Star 
                      className={`h-8 w-8 mx-1 ${i < score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">
              {scorePercent >= 90 ? 'Perfect!' : 
               scorePercent >= 70 ? 'Great job!' : 
               scorePercent >= 50 ? 'Good effort!' : 'Keep practicing!'}
            </p>
          </motion.div>
          
          {/* Progress bar */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-700">Course Progress</h3>
              <div className="text-sm font-medium text-gray-600">{progress.progress}% complete</div>
            </div>
            <ProgressBar progress={progress.progress} className="mb-2 mx-auto" height={10} showAnimation={true} />
          </motion.div>
        </motion.div>
        
        {/* Buttons */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            className="py-6 text-center text-lg font-bold rounded-xl bg-primary text-white hover:bg-primary/90 shadow-md"
            onClick={handleContinue}
          >
            <span>Continue</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="py-6 text-center text-lg font-bold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={handleBackToLessons}
          >
            Back to Lessons
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LessonCompletion;
