import { 
  Exercise, 
  MultipleChoiceExercise, 
  MatchingExercise, 
  FillBlankExercise, 
  ListeningExercise, 
  PronunciationExercise 
} from "@/types";

// French Exercises
const frenchExercises: Record<number, Exercise[]> = {
  1: [
    {
      id: "fr-mc-1",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Salut!",
      options: [
        { id: "1", text: "Hello!", isCorrect: true },
        { id: "2", text: "Goodbye!", isCorrect: false },
        { id: "3", text: "Thank you!", isCorrect: false },
        { id: "4", text: "See you!", isCorrect: false }
      ]
    },
    {
      id: "fr-match-1",
      type: "matching",
      pairs: [
        { id: "1", sourceText: "oui", targetText: "yes" },
        { id: "2", sourceText: "non", targetText: "no" },
        { id: "3", sourceText: "merci", targetText: "thank you" },
        { id: "4", sourceText: "s'il vous plaît", targetText: "please" }
      ]
    }
  ],
  2: [
    {
      id: "fr-fill-1",
      type: "fill-blank",
      sentence: "Je ______ un jus d'orange.",
      options: [
        { id: "1", text: "veux", isCorrect: true },
        { id: "2", text: "suis", isCorrect: false },
        { id: "3", text: "ai", isCorrect: false },
        { id: "4", text: "bois", isCorrect: false }
      ],
      blankPosition: 1
    }
  ],
  3: [
    {
      id: "fr-listening-1",
      type: "listening",
      audio: "french/je-mappelle-jean.mp3",
      question: "What did you hear?",
      options: [
        { id: "1", text: "Je m'appelle Jean.", isCorrect: true },
        { id: "2", text: "J'habite à Paris.", isCorrect: false },
        { id: "3", text: "Je suis français.", isCorrect: false },
        { id: "4", text: "J'aime le français.", isCorrect: false }
      ]
    }
  ],
  4: [
    {
      id: "fr-pronunciation-1",
      type: "pronunciation",
      text: "Bonne journée!",
      audio: "french/bonne-journee.mp3"
    }
  ]
};

// Spanish Exercises
const spanishExercises: Record<number, Exercise[]> = {
  1: [
    {
      id: "es-mc-1",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Hola!",
      options: [
        { id: "1", text: "Hello!", isCorrect: true },
        { id: "2", text: "Goodbye!", isCorrect: false },
        { id: "3", text: "See you!", isCorrect: false },
        { id: "4", text: "Thanks!", isCorrect: false }
      ]
    }
  ],
  2: [
    {
      id: "es-fill-1",
      type: "fill-blank",
      sentence: "Yo ______ agua, por favor.",
      options: [
        { id: "1", text: "quiero", isCorrect: true },
        { id: "2", text: "soy", isCorrect: false },
        { id: "3", text: "tengo", isCorrect: false },
        { id: "4", text: "beber", isCorrect: false }
      ],
      blankPosition: 1
    }
  ],
  3: [
    {
      id: "es-listening-1",
      type: "listening",
      audio: "spanish/me-llamo-carlos.mp3",
      question: "What did you hear?",
      options: [
        { id: "1", text: "Me llamo Carlos.", isCorrect: true },
        { id: "2", text: "Yo soy de España.", isCorrect: false },
        { id: "3", text: "Me gusta la comida.", isCorrect: false },
        { id: "4", text: "Hola, buenos días.", isCorrect: false }
      ]
    }
  ],
  4: [
    {
      id: "es-pronunciation-1",
      type: "pronunciation",
      text: "Buenos días!",
      audio: "spanish/buenos-dias.mp3"
    }
  ]
};

// German Exercises
const germanExercises: Record<number, Exercise[]> = {
  1: [
    {
      id: "de-mc-1",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Guten Morgen!",
      options: [
        { id: "1", text: "Good morning!", isCorrect: true },
        { id: "2", text: "Good night!", isCorrect: false },
        { id: "3", text: "Hello!", isCorrect: false },
        { id: "4", text: "Goodbye!", isCorrect: false }
      ]
    }
  ]
};

// English Exercises
const englishExercises: Record<number, Exercise[]> = {
  1: [
    {
      id: "en-mc-1",
      type: "multiple-choice",
      question: "Select the correct translation to French",
      prompt: "Good evening!",
      options: [
        { id: "1", text: "Bonsoir!", isCorrect: true },
        { id: "2", text: "Bonjour!", isCorrect: false },
        { id: "3", text: "Bonne nuit!", isCorrect: false },
        { id: "4", text: "Salut!", isCorrect: false }
      ]
    }
  ],
  2: [
    {
      id: "en-fill-1",
      type: "fill-blank",
      sentence: "I ______ a glass of water, please.",
      options: [
        { id: "1", text: "would like", isCorrect: true },
        { id: "2", text: "want", isCorrect: false },
        { id: "3", text: "am", isCorrect: false },
        { id: "4", text: "have", isCorrect: false }
      ],
      blankPosition: 2
    }
  ],
  3: [
    {
      id: "en-listening-1",
      type: "listening",
      audio: "english/my-name-is-john.mp3",
      question: "What did you hear?",
      options: [
        { id: "1", text: "My name is John.", isCorrect: true },
        { id: "2", text: "I am from England.", isCorrect: false },
        { id: "3", text: "I speak English.", isCorrect: false },
        { id: "4", text: "Good morning!", isCorrect: false }
      ]
    }
  ],
  4: [
    {
      id: "en-pronunciation-1",
      type: "pronunciation",
      text: "Good night!",
      audio: "english/good-night.mp3"
    }
  ]
};

const exercisesMap: Record<string, Record<number, Exercise[]>> = {
  french: frenchExercises,
  spanish: spanishExercises,
  german: germanExercises,
  english: englishExercises
};

export const getExercisesForLesson = (languageId: string, lessonId: number): Exercise[] => {
  return exercisesMap[languageId]?.[lessonId] || [];
};
