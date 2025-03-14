import { createContext, useContext, useState, ReactNode } from "react";
import { Language, LanguageProgress, Lesson, Unit, Exercise } from "@/types";
import { languages } from "@/data/languages";
import { getLessonsForLanguage } from "@/data/lessons";
import { getExercisesForLesson } from "@/data/exercises";

interface LanguageContextType {
  selectedLanguage: Language | null;
  setSelectedLanguage: (language: Language | null) => void;
  userProgress: LanguageProgress[];
  getLanguageProgress: (languageId: string) => LanguageProgress;
  getLessons: (languageId: string) => Unit[];
  getExercises: (languageId: string, lessonId: number) => Exercise[];
  completeLesson: (languageId: string, lessonId: number, score: number) => void;
  completeExercise: (languageId: string, lessonId: number, exerciseId: string, isCorrect: boolean) => void;
  currentExerciseIndex: number;
  setCurrentExerciseIndex: (index: number) => void;
  resetExerciseProgress: () => void;
  currentExerciseCount: number;
  correctAnswers: number;
}

const initialProgress: LanguageProgress[] = languages.map(lang => ({
  languageId: lang.id,
  progress: 0,
  currentUnitId: 1,
  currentLessonId: 1,
  xp: 0,
  hearts: 5,
  gems: 0,
  streak: 0
}));

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [userProgress, setUserProgress] = useState<LanguageProgress[]>(initialProgress);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentExerciseCount, setCurrentExerciseCount] = useState(5);

  const getLanguageProgress = (languageId: string) => {
    return userProgress.find(p => p.languageId === languageId) || initialProgress[0];
  };

  const getLessons = (languageId: string) => {
    return getLessonsForLanguage(languageId);
  };

  const getExercises = (languageId: string, lessonId: number) => {
    const exercises = getExercisesForLesson(languageId, lessonId);
    setCurrentExerciseCount(exercises.length);
    return exercises;
  };

  const completeLesson = (languageId: string, lessonId: number, score: number) => {
    setUserProgress(prev => {
      return prev.map(p => {
        if (p.languageId === languageId) {
          const xpGained = score * 5;
          const gemsGained = Math.floor(score * 3);
          
          return {
            ...p,
            xp: p.xp + xpGained,
            gems: p.gems + gemsGained,
            progress: Math.min(p.progress + 5, 100),
            currentLessonId: lessonId + 1
          };
        }
        return p;
      });
    });
  };

  const completeExercise = (languageId: string, lessonId: number, exerciseId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setCurrentExerciseIndex(prev => prev + 1);
  };

  const resetExerciseProgress = () => {
    setCurrentExerciseIndex(0);
    setCorrectAnswers(0);
  };

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        userProgress,
        getLanguageProgress,
        getLessons,
        getExercises,
        completeLesson,
        completeExercise,
        currentExerciseIndex,
        setCurrentExerciseIndex,
        resetExerciseProgress,
        currentExerciseCount,
        correctAnswers
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
