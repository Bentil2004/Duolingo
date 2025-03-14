import { useParams, Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/data/languages";
import { ChevronLeft } from "lucide-react";
import LessonCard from "@/components/LessonCard";
import ProgressBar from "@/components/ProgressBar";

const LessonsOverview = () => {
  const { language } = useParams();
  const { getLanguageProgress, getLessons } = useLanguage();
  
  // Find language data
  const languageData = languages.find(lang => lang.id === language);
  
  if (!languageData) {
    return (
      <section className="py-8 px-4 container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Language not found</h2>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Go back to language selection
          </Link>
        </div>
      </section>
    );
  }
  
  // Get user progress
  const progress = getLanguageProgress(languageData.id);
  
  // Get lessons
  const units = getLessons(languageData.id);
  
  return (
    <section className="py-8 px-4 container mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center text-neutral-700 hover:text-primary transition">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </Link>
        <div className="flex items-center">
          <img 
            src={languageData.flag} 
            alt={`${languageData.name} Flag`} 
            className="w-8 h-8 rounded-full object-cover mr-2" 
          />
          <h2 className="text-xl font-bold">{languageData.name}</h2>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md mb-8">
        <h3 className="text-lg font-bold mb-3">Your Progress</h3>
        <ProgressBar progress={progress.progress} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Beginner</span>
          <span>{progress.progress}% Complete</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {units.map(unit => (
          <div key={unit.id} className={`bg-white rounded-xl p-6 shadow-md ${unit.isLocked ? 'opacity-75' : ''}`}>
            <h3 className="text-xl font-bold mb-4">{unit.title}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {unit.lessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  languageId={languageData.id} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LessonsOverview;
