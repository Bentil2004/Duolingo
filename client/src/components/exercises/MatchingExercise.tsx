import { useState, useEffect } from "react";
import { MatchingExercise as MatchingExerciseType, MatchingPair } from "@/types";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface MatchingExerciseProps {
  exercise: MatchingExerciseType;
  onComplete: (isCorrect: boolean) => void;
}

type MatchState = {
  sourceId: string | null;
  targetId: string | null;
};

const MatchingExercise = ({ exercise, onComplete }: MatchingExerciseProps) => {
  const [matches, setMatches] = useState<MatchState[]>([]);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [completedPairs, setCompletedPairs] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Shuffle pairs for display
  const [shuffledSources, setShuffledSources] = useState<MatchingPair[]>([]);
  const [shuffledTargets, setShuffledTargets] = useState<MatchingPair[]>([]);
  
  useEffect(() => {
    // Reset state when exercise changes
    setMatches([]);
    setSelectedSource(null);
    setCompletedPairs([]);
    setShowFeedback(false);
    
    // Shuffle pairs
    const sourcePairs = [...exercise.pairs];
    const targetPairs = [...exercise.pairs];
    
    for (let i = sourcePairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sourcePairs[i], sourcePairs[j]] = [sourcePairs[j], sourcePairs[i]];
    }
    
    for (let i = targetPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [targetPairs[i], targetPairs[j]] = [targetPairs[j], targetPairs[i]];
    }
    
    setShuffledSources(sourcePairs);
    setShuffledTargets(targetPairs);
  }, [exercise]);
  
  const handleSourceClick = (pairId: string) => {
    if (completedPairs.includes(pairId)) return;
    
    setSelectedSource(pairId);
  };
  
  const handleTargetClick = (pairId: string) => {
    if (!selectedSource || completedPairs.includes(pairId)) return;
    
    // Check if match is correct
    const isCorrectMatch = selectedSource === pairId;
    
    if (isCorrectMatch) {
      setCompletedPairs([...completedPairs, pairId]);
      setMatches([...matches, { sourceId: selectedSource, targetId: pairId }]);
    }
    
    setSelectedSource(null);
  };
  
  const checkAllMatches = () => {
    setShowFeedback(true);
    const allMatchesCorrect = completedPairs.length === exercise.pairs.length;
    
    setTimeout(() => {
      onComplete(allMatchesCorrect);
    }, 1500);
  };
  
  const getSourceClass = (pairId: string) => {
    const baseClass = "p-3 rounded-lg shadow-sm cursor-pointer transition";
    
    if (completedPairs.includes(pairId)) {
      return `${baseClass} bg-green-100 border-green-300 border-2`;
    }
    
    if (selectedSource === pairId) {
      return `${baseClass} bg-blue-100 border-blue-300 border-2`;
    }
    
    return `${baseClass} bg-blue-50 hover:bg-blue-100`;
  };
  
  const getTargetClass = (pairId: string) => {
    const baseClass = "p-3 rounded-lg shadow-sm cursor-pointer transition";
    
    if (completedPairs.includes(pairId)) {
      return `${baseClass} bg-green-100 border-green-300 border-2`;
    }
    
    if (selectedSource) {
      return `${baseClass} bg-green-50 hover:bg-green-100`;
    }
    
    return `${baseClass} bg-green-50`;
  };
  
  const allMatched = completedPairs.length === exercise.pairs.length;
  
  return (
    <div className="exercise-container">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Match the pairs</h3>
        <p className="text-gray-600">Select a word and then its matching translation</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="col-span-1 space-y-3">
          {shuffledSources.map(pair => (
            <motion.div
              key={`source-${pair.id}`}
              className={getSourceClass(pair.id)}
              onClick={() => handleSourceClick(pair.id)}
              whileHover={{ scale: completedPairs.includes(pair.id) ? 1 : 1.03 }}
              animate={{ 
                opacity: completedPairs.includes(pair.id) && !showFeedback ? 0.7 : 1 
              }}
            >
              <p className="text-center">{pair.sourceText}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="col-span-1 space-y-3">
          {shuffledTargets.map(pair => (
            <motion.div
              key={`target-${pair.id}`}
              className={getTargetClass(pair.id)}
              onClick={() => handleTargetClick(pair.id)}
              whileHover={{ scale: completedPairs.includes(pair.id) ? 1 : 1.03 }}
              animate={{ 
                opacity: completedPairs.includes(pair.id) && !showFeedback ? 0.7 : 1 
              }}
            >
              <p className="text-center">{pair.targetText}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <AnimatePresence>
          {allMatched && !showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Button 
                className="w-full py-6 text-lg font-bold rounded-xl"
                onClick={checkAllMatches}
              >
                Check
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {showFeedback && (
          <div className="text-center text-xl font-bold text-green-500">
            Great job! All pairs matched correctly.
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchingExercise;
