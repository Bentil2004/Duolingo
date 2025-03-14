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
  audio?: string; // Path to the audio file for this option
}

export interface MultipleChoiceExercise {
  id: string;
  type: 'multiple-choice';
  question: string;
  prompt: string;
  options: ExerciseOption[];
  questionAudio?: string; // Optional path to audio file for the question
  promptAudio?: string; // Optional path to audio file for the prompt
}

export interface MatchingPair {
  id: string;
  sourceText: string;
  targetText: string;
  sourceAudio?: string; // Optional path to audio file for source text
  targetAudio?: string; // Optional path to audio file for target text
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
  sentenceAudio?: string; // Optional path to audio file for the complete sentence
}

export interface ListeningExercise {
  id: string;
  type: 'listening';
  audio: string; // Path to the audio file that user must listen to
  question: string;
  options: ExerciseOption[];
}

export interface PronunciationExercise {
  id: string;
  type: 'pronunciation';
  text: string; // Text that user must pronounce
  audio: string; // Path to the correct pronunciation audio
}

export type Exercise = 
  | MultipleChoiceExercise 
  | MatchingExercise 
  | FillBlankExercise
  | ListeningExercise
  | PronunciationExercise;
