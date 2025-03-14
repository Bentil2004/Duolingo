import { useState } from "react";
import { FillBlankExercise as FillBlankExerciseType } from "@/types";
import { Button } from "@/components/ui/button";

interface FillBlankExerciseProps {
  exercise: FillBlankExerciseType;
  onComplete: (isCorrect: boolean) => void;
}

const FillBlankExercise = ({ exercise, onComplete }: FillBlankExerciseProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Parse sentence to insert blank
  const sentenceParts = exercise.sentence.split('______');
  
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
    const baseClass = "p-3 rounded-xl border-2 cursor-pointer text-center transition";
    
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
  
  const getSelectedText = () => {
    if (!selectedOption) return '______';
    return exercise.options.find(opt => opt.id === selectedOption)?.text || '______';
  };
  
  return (
    <div className="exercise-container">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Complete the sentence</h3>
        <p className="text-gray-600 mb-4">Fill in the blank with the correct word</p>
        
        <div className="text-xl mb-6 p-4 bg-gray-50 rounded-lg">
          {sentenceParts[0]}
          <span className={`font-bold ${selectedOption ? 'bg-primary/10 px-1 py-0.5 rounded' : ''}`}>
            {getSelectedText()}
          </span>
          {sentenceParts[1]}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
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

export default FillBlankExercise;
