import { useParams, Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/data/languages";
import { ChevronLeft, BookOpen, Trophy, Heart, GraduationCap, Flame } from "lucide-react";
import LessonCard from "@/components/LessonCard";
import ProgressBar from "@/components/ProgressBar";
import { motion } from "framer-motion";

const LessonsOverview = () => {
  const { language } = useParams();
  const { getLanguageProgress, getLessons } = useLanguage();

  const languageData = languages.find(lang => lang.id === language);
  
  if (!languageData) {
    return (
      <motion.section 
        className="py-12 px-4 container mx-auto max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center bg-white p-10 rounded-2xl shadow-md">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Language not found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the language you're looking for.</p>
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Return to language selection
          </Link>
        </div>
      </motion.section>
    );
  }

  const progress = getLanguageProgress(languageData.id);

  const units = getLessons(languageData.id);

  const totalLessons = units.reduce((total, unit) => total + unit.lessons.length, 0);
  const completedLessons = units.reduce((total, unit) => {
    return total + unit.lessons.filter(lesson => lesson.isCompleted).length;
  }, 0);
  
  return (
    <motion.section 
      className="py-8 px-4 container mx-auto max-w-5xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center justify-center p-2 bg-white shadow-sm rounded-full text-gray-700 hover:text-primary transition mr-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={languageData.flag} 
                alt={`${languageData.name} Flag`} 
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" 
              />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-3 w-3 text-primary" />
                </div>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold gradient-heading">
                {languageData.name}
              </h2>
              <div className="text-sm text-gray-500">
                {completedLessons} of {totalLessons} lessons completed
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-white p-3 rounded-xl shadow-sm flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <Trophy className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">XP</div>
              <div className="font-bold">{progress.xp}</div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl shadow-sm flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <Heart className="h-4 w-4 text-red-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Hearts</div>
              <div className="font-bold">{progress.hearts}</div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl shadow-sm flex items-center">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Streak</div>
              <div className="font-bold">{progress.streak} days</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <div className="flex items-center mb-3">
          <BookOpen className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-bold">Your Learning Progress</h3>
        </div>
        <ProgressBar progress={progress.progress} className="mb-2" height={16} />
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary/20 mr-1"></div>
            <span className="text-gray-600">Beginner</span>
          </div>
          <div className="text-gray-700 font-semibold">
            {progress.progress}% Complete
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Fluent</span>
            <div className="w-3 h-3 rounded-full bg-primary ml-1"></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {units.map((unit, index) => (
          <motion.div 
            key={unit.id} 
            className={`bg-white rounded-xl p-6 shadow-md ${unit.isLocked ? 'opacity-75' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <div className="border-b pb-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{unit.title}</h3>
                {unit.isLocked ? (
                  <div className="flex items-center text-xs text-gray-500">
                    <Lock className="h-4 w-4 mr-1" />
                    Locked
                  </div>
                ) : (
                  <div className="bg-primary/10 text-primary text-xs py-1 px-3 rounded-full font-medium">
                    {unitCompletionStatus(unit)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unit.lessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  languageId={languageData.id} 
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

function unitCompletionStatus(unit: { lessons: { isCompleted: boolean }[] }) {
  const totalLessons = unit.lessons.length;
  const completedLessons = unit.lessons.filter(lesson => lesson.isCompleted).length;
  
  if (completedLessons === 0) return 'Not started';
  if (completedLessons === totalLessons) return 'Completed';
  return `${completedLessons}/${totalLessons} completed`;
}

const Lock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className || "h-6 w-6"} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
    />
  </svg>
);

export default LessonsOverview;
