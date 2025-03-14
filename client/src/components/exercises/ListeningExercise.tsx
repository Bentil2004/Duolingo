import { useState } from "react";
import { ListeningExercise as ListeningExerciseType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Volume2 } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";
import AudioButton from "@/components/AudioButton";

interface ListeningExerciseProps {
  exercise: ListeningExerciseType;
  onComplete: (isCorrect: boolean) => void;
}

const ListeningExercise = ({ exercise, onComplete }: ListeningExerciseProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionChange = (value: string) => {
    if (!hasSubmitted) {
      setSelectedOptionId(value);
    }
  };

  const handleSubmit = () => {
    if (!selectedOptionId || hasSubmitted) return;

    const selectedOption = exercise.options.find(
      (option) => option.id === selectedOptionId
    );
    const correct = !!selectedOption?.isCorrect;

    setIsCorrect(correct);
    setHasSubmitted(true);

    // Allow some time to see the result before moving on
    setTimeout(() => {
      onComplete(correct);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto my-8"
    >
      <Card className="shadow-lg border-2 border-primary/10">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center gradient-text">
            {exercise.question}
          </h2>

          <div className="flex justify-center mb-8">
            <AudioButton 
              src={exercise.audio} 
              size="lg" 
              variant="primary" 
              autoPlay 
              showLabel 
              label="Listen again" 
            />
          </div>

          <RadioGroup
            value={selectedOptionId || ""}
            onValueChange={handleOptionChange}
            className="space-y-4"
          >
            {exercise.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let optionClass = "p-4 border-2 rounded-xl transition-all";

              if (hasSubmitted) {
                if (option.isCorrect) {
                  optionClass += " border-green-500 bg-green-50";
                } else if (isSelected && !option.isCorrect) {
                  optionClass += " border-red-500 bg-red-50";
                } else {
                  optionClass += " border-gray-200";
                }
              } else {
                optionClass += isSelected
                  ? " border-primary bg-primary/5"
                  : " border-gray-200 hover:border-primary/50";
              }

              return (
                <div key={option.id} className={optionClass}>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      disabled={hasSubmitted}
                      className="mr-3"
                    />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 font-medium text-lg cursor-pointer"
                    >
                      {option.text}
                    </Label>
                    {hasSubmitted && option.isCorrect && (
                      <CheckCircle2 className="h-6 w-6 text-green-500 ml-2" />
                    )}
                    {hasSubmitted && isSelected && !option.isCorrect && (
                      <XCircle className="h-6 w-6 text-red-500 ml-2" />
                    )}
                  </div>
                </div>
              );
            })}
          </RadioGroup>

          <div className="mt-8 text-center">
            {!hasSubmitted ? (
              <Button
                onClick={handleSubmit}
                disabled={!selectedOptionId}
                size="lg"
                className="min-w-[200px] py-6 text-lg font-bold rounded-xl"
              >
                Check
              </Button>
            ) : (
              <div
                className={`text-xl font-bold ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {isCorrect ? "Correct! 🎉" : "Try again next time! 💪"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ListeningExercise;