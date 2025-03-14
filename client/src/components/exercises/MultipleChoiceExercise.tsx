import { useState } from "react";
import { MultipleChoiceExercise as MultipleChoiceExerciseType } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MultipleChoiceExerciseProps {
  exercise: MultipleChoiceExerciseType;
  onComplete: (isCorrect: boolean) => void;
}

const MultipleChoiceExercise = ({ exercise, onComplete }: MultipleChoiceExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };
  
  const checkAnswer = () => {
    if (!selectedOption) return;
    
    setShowFeedback(true);
    const selectedOptionData = exercise.options.find(opt => opt.id === selectedOption);
    const isCorrect = selectedOptionData?.isCorrect ?? false;
    
    // Wait a moment to show feedback before moving on
    setTimeout(() => {
      onComplete(isCorrect);
      setShowFeedback(false);
      setSelectedOption(null);
    }, 1000);
  };
  
  const getOptionClass = (optionId: string) => {
    const baseClass = "p-4 rounded-xl border-2 transition cursor-pointer";
    
    if (!showFeedback) {
      return `${baseClass} ${selectedOption === optionId 
        ? "border-primary bg-primary/10" 
        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`;
    }
    
    // Option is selected and correct
    if (selectedOption === optionId && exercise.options.find(o => o.id === optionId)?.isCorrect) {
      return `${baseClass} border-green-500 bg-green-50`;
    }
    
    // Option is selected but incorrect
    if (selectedOption === optionId) {
      return `${baseClass} border-red-500 bg-red-50`;
    }
    
    // Option is correct but wasn't selected
    if (exercise.options.find(o => o.id === optionId)?.isCorrect) {
      return `${baseClass} border-green-500 bg-green-50/50`;
    }
    
    // Neither selected nor correct
    return `${baseClass} border-gray-200 opacity-50`;
  };
  
  return (
    <div className="exercise-container">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">{exercise.question}</h3>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="mr-2 rounded-full"
            title="Listen"
          >
            <Volume2 className="h-5 w-5 text-gray-600" />
          </Button>
          <p className="text-xl">{exercise.prompt}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3 mb-6">
        {exercise.options.map(option => (
          <div
            key={option.id}
            className={getOptionClass(option.id)}
            onClick={() => handleOptionSelect(option.id)}
          >
            <p>{option.text}</p>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <Button 
          className="w-full py-6 text-lg font-bold rounded-xl"
          disabled={!selectedOption || showFeedback}
          onClick={checkAnswer}
        >
          {showFeedback 
            ? exercise.options.find(o => o.id === selectedOption)?.isCorrect 
              ? "Correct!" 
              : "Incorrect!" 
            : "Check"
          }
        </Button>
      </div>
    </div>
  );
};

export default MultipleChoiceExercise;
