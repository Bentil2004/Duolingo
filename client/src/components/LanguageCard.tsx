import { Language } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Users, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

interface LanguageCardProps {
  language: Language;
}

const LanguageCard = ({ language }: LanguageCardProps) => {
  const { setSelectedLanguage, userProgress } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Check if user has started this language
  const progress = userProgress.find(p => p.languageId === language.id);
  const hasStarted = progress && progress.xp > 0;
  
  const handleClick = () => {
    setSelectedLanguage(language);
    setLocation(`/lessons/${language.id}`);
  };
  
  return (
    <motion.div 
      className="bg-white p-6 shadow-md rounded-xl cursor-pointer card-hover relative overflow-hidden"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {hasStarted && (
        <div className="absolute top-3 right-3 bg-primary text-white text-xs py-1 px-2 rounded-full">
          In Progress
        </div>
      )}
      
      <div className="flex items-center mb-6">
        <div className="relative">
          <img 
            src={language.flag} 
            alt={`${language.name} Flag`} 
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" 
          />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
            <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">
              <GraduationCap className="h-3 w-3 text-primary" />
            </div>
          </div>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold text-gray-800">{language.name}</h2>
          {hasStarted && (
            <div className="flex items-center mt-1">
              <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progress?.progress || 0}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs text-gray-500">{progress?.progress || 0}%</span>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed">{language.description}</p>
      
      <div className="flex justify-between items-center border-t pt-4">
        <div className="flex items-center text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          <span className="text-sm">{language.speakerCount}</span>
        </div>
        
        <button className="flex items-center text-sm font-medium text-primary hover:underline">
          <span>Start learning</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default LanguageCard;
