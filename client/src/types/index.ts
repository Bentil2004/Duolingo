export interface Language {
  id: string;
  name: string;
  flag: string;
  description: string;
  speakerCount: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  progress: number;
  isCompleted: boolean;
  isLocked: boolean;
  unitId: number;
}

export interface Unit {
  id: number;
  title: string;
  isLocked: boolean;
  lessons: Lesson[];
}

export interface LanguageProgress {
  languageId: string;
  progress: number;
  currentUnitId: number;
  currentLessonId: number;
  xp: number;
  hearts: number;
  gems: number;
  streak: number;
}

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MultipleChoiceExercise {
  id: string;
  type: 'multiple-choice';
  question: string;
  prompt: string;
  options: ExerciseOption[];
}

export interface MatchingPair {
  id: string;
  sourceText: string;
  targetText: string;
}

export interface MatchingExercise {
  id: string;
  type: 'matching';
  pairs: MatchingPair[];
}

export interface FillBlankExercise {
  id: string;
  type: 'fill-blank';
  sentence: string;
  options: ExerciseOption[];
  blankPosition: number;
}

export type Exercise = MultipleChoiceExercise | MatchingExercise | FillBlankExercise;
