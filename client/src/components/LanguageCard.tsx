import { Language } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

interface LanguageCardProps {
  language: Language;
}

const LanguageCard = ({ language }: LanguageCardProps) => {
  const { setSelectedLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  
  const handleClick = () => {
    setSelectedLanguage(language);
    setLocation(`/lessons/${language.id}`);
  };
  
  return (
    <div 
      className="bg-white p-6 shadow-md rounded-xl cursor-pointer transition-transform hover:translate-y-[-5px]"
      onClick={handleClick}
    >
      <div className="flex items-center mb-4">
        <img 
          src={language.flag} 
          alt={`${language.name} Flag`} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <h2 className="text-xl font-bold">{language.name}</h2>
      </div>
      <p className="text-gray-600 mb-4">{language.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{language.speakerCount}</span>
        <div className="text-primary">
          <ChevronRight className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default LanguageCard;
