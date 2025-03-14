import { useState, useRef } from "react";
import { PronunciationExercise as PronunciationExerciseType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Volume2, Mic, MicOff, CheckCircle2 } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";
import AudioButton from "@/components/AudioButton";

interface PronunciationExerciseProps {
  exercise: PronunciationExerciseType;
  onComplete: (isCorrect: boolean) => void;
}

// This would need to be connected to a speech recognition API in a real implementation
const PronunciationExercise = ({ exercise, onComplete }: PronunciationExerciseProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const recordingTimeoutRef = useRef<number | null>(null);

  // In a real implementation, this would process actual speech recognition results
  // For this simulation, we'll mark it as "correct" after practicing a few times
  const simulateRecordingProcess = () => {
    setIsRecording(true);
    
    // Simulate recording for 3 seconds
    if (recordingTimeoutRef.current) {
      window.clearTimeout(recordingTimeoutRef.current);
    }
    
    recordingTimeoutRef.current = window.setTimeout(() => {
      setIsRecording(false);
      setAttempts(prev => prev + 1);
      
      // After 2 attempts, consider it "correct" for the demo
      if (attempts >= 1) {
        setHasCompleted(true);
        setTimeout(() => {
          onComplete(true);
        }, 1500);
      }
    }, 3000);
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
          <h2 className="text-2xl font-bold mb-8 text-center gradient-text">
            Repeat the phrase
          </h2>

          <div className="flex justify-center mb-6">
            <AudioButton 
              src={exercise.audio} 
              size="lg" 
              variant="primary" 
              autoPlay 
              showLabel 
              label="Listen again" 
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 my-8">
            <h3 className="text-2xl text-center font-bold text-primary mb-2">
              {exercise.text}
            </h3>
            <p className="text-center text-gray-500">
              Try to pronounce this phrase as accurately as possible
            </p>
          </div>

          <div className="mt-8 text-center">
            {!hasCompleted ? (
              <div className="space-y-4">
                <Button
                  onClick={simulateRecordingProcess}
                  disabled={isRecording}
                  size="lg"
                  className={`min-w-[200px] py-6 text-lg font-bold rounded-xl ${
                    isRecording ? "bg-red-500 hover:bg-red-600" : ""
                  }`}
                >
                  {isRecording ? (
                    <> 
                      <MicOff className="mr-2 h-5 w-5 animate-pulse" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-5 w-5" />
                      Start Speaking
                    </>
                  )}
                </Button>

                {attempts > 0 && (
                  <p className="text-gray-700 font-medium">
                    Attempts: {attempts}. {attempts === 1 ? "Try once more!" : ""}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-xl font-bold text-green-500 flex items-center justify-center">
                <CheckCircle2 className="mr-2 h-6 w-6" />
                Great pronunciation! 🎉
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Tip: Speak clearly and at a normal pace</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PronunciationExercise;