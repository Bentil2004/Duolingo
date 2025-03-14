import { Exercise, MultipleChoiceExercise, MatchingExercise, FillBlankExercise } from "@/types";

// Create language-specific exercises
const frenchExercises: Record<number, Exercise[]> = {
  3: [
    {
      id: "fr-mc-1",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Bonjour, comment ça va?",
      options: [
        { id: "1", text: "Hello, how are you?", isCorrect: true },
        { id: "2", text: "Good morning, what's your name?", isCorrect: false },
        { id: "3", text: "Goodbye, see you later!", isCorrect: false },
        { id: "4", text: "Hello, where are you from?", isCorrect: false }
      ]
    },
    {
      id: "fr-match-1",
      type: "matching",
      pairs: [
        { id: "1", sourceText: "bonjour", targetText: "hello" },
        { id: "2", sourceText: "merci", targetText: "thank you" },
        { id: "3", sourceText: "au revoir", targetText: "goodbye" },
        { id: "4", sourceText: "s'il vous plaît", targetText: "please" }
      ]
    },
    {
      id: "fr-fill-1",
      type: "fill-blank",
      sentence: "Je ______ un café, s'il vous plaît.",
      options: [
        { id: "1", text: "voudrais", isCorrect: true },
        { id: "2", text: "veux", isCorrect: false },
        { id: "3", text: "suis", isCorrect: false },
        { id: "4", text: "ai", isCorrect: false }
      ],
      blankPosition: 1
    },
    {
      id: "fr-mc-2",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Je m'appelle Jean.",
      options: [
        { id: "1", text: "My name is Jean.", isCorrect: true },
        { id: "2", text: "I call Jean.", isCorrect: false },
        { id: "3", text: "Call me Jean.", isCorrect: false },
        { id: "4", text: "I like Jean.", isCorrect: false }
      ]
    },
    {
      id: "fr-fill-2",
      type: "fill-blank",
      sentence: "Il y a ______ personnes dans la salle.",
      options: [
        { id: "1", text: "trois", isCorrect: true },
        { id: "2", text: "trois de", isCorrect: false },
        { id: "3", text: "les trois", isCorrect: false },
        { id: "4", text: "de trois", isCorrect: false }
      ],
      blankPosition: 3
    }
  ]
};

const spanishExercises: Record<number, Exercise[]> = {
  3: [
    {
      id: "es-mc-1",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Hola, ¿cómo estás?",
      options: [
        { id: "1", text: "Hello, how are you?", isCorrect: true },
        { id: "2", text: "Good morning, what's your name?", isCorrect: false },
        { id: "3", text: "Goodbye, see you later!", isCorrect: false },
        { id: "4", text: "Hello, where are you from?", isCorrect: false }
      ]
    },
    {
      id: "es-match-1",
      type: "matching",
      pairs: [
        { id: "1", sourceText: "hola", targetText: "hello" },
        { id: "2", sourceText: "gracias", targetText: "thank you" },
        { id: "3", sourceText: "adiós", targetText: "goodbye" },
        { id: "4", sourceText: "por favor", targetText: "please" }
      ]
    },
    {
      id: "es-fill-1",
      type: "fill-blank",
      sentence: "Yo ______ un café, por favor.",
      options: [
        { id: "1", text: "quiero", isCorrect: true },
        { id: "2", text: "querer", isCorrect: false },
        { id: "3", text: "soy", isCorrect: false },
        { id: "4", text: "tengo", isCorrect: false }
      ],
      blankPosition: 1
    },
    {
      id: "es-mc-2",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Me llamo Carlos.",
      options: [
        { id: "1", text: "My name is Carlos.", isCorrect: true },
        { id: "2", text: "I call Carlos.", isCorrect: false },
        { id: "3", text: "Call me Carlos.", isCorrect: false },
        { id: "4", text: "I like Carlos.", isCorrect: false }
      ]
    },
    {
      id: "es-fill-2",
      type: "fill-blank",
      sentence: "Hay ______ personas en la habitación.",
      options: [
        { id: "1", text: "tres", isCorrect: true },
        { id: "2", text: "tres de", isCorrect: false },
        { id: "3", text: "las tres", isCorrect: false },
        { id: "4", text: "de tres", isCorrect: false }
      ],
      blankPosition: 1
    }
  ]
};

const germanExercises: Record<number, Exercise[]> = {
  3: [
    {
      id: "de-mc-1",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Hallo, wie geht es dir?",
      options: [
        { id: "1", text: "Hello, how are you?", isCorrect: true },
        { id: "2", text: "Good morning, what's your name?", isCorrect: false },
        { id: "3", text: "Goodbye, see you later!", isCorrect: false },
        { id: "4", text: "Hello, where are you from?", isCorrect: false }
      ]
    },
    {
      id: "de-match-1",
      type: "matching",
      pairs: [
        { id: "1", sourceText: "hallo", targetText: "hello" },
        { id: "2", sourceText: "danke", targetText: "thank you" },
        { id: "3", sourceText: "auf wiedersehen", targetText: "goodbye" },
        { id: "4", sourceText: "bitte", targetText: "please" }
      ]
    },
    {
      id: "de-fill-1",
      type: "fill-blank",
      sentence: "Ich ______ einen Kaffee, bitte.",
      options: [
        { id: "1", text: "möchte", isCorrect: true },
        { id: "2", text: "will", isCorrect: false },
        { id: "3", text: "bin", isCorrect: false },
        { id: "4", text: "habe", isCorrect: false }
      ],
      blankPosition: 1
    },
    {
      id: "de-mc-2",
      type: "multiple-choice",
      question: "Select the correct translation",
      prompt: "Ich heiße Hans.",
      options: [
        { id: "1", text: "My name is Hans.", isCorrect: true },
        { id: "2", text: "I call Hans.", isCorrect: false },
        { id: "3", text: "Call me Hans.", isCorrect: false },
        { id: "4", text: "I like Hans.", isCorrect: false }
      ]
    },
    {
      id: "de-fill-2",
      type: "fill-blank",
      sentence: "Es gibt ______ Personen im Raum.",
      options: [
        { id: "1", text: "drei", isCorrect: true },
        { id: "2", text: "drei von", isCorrect: false },
        { id: "3", text: "die drei", isCorrect: false },
        { id: "4", text: "von drei", isCorrect: false }
      ],
      blankPosition: 2
    }
  ]
};

const englishExercises: Record<number, Exercise[]> = {
  3: [
    {
      id: "en-mc-1",
      type: "multiple-choice",
      question: "Select the correct translation to French",
      prompt: "Hello, how are you?",
      options: [
        { id: "1", text: "Bonjour, comment ça va?", isCorrect: true },
        { id: "2", text: "Bonjour, quel est ton nom?", isCorrect: false },
        { id: "3", text: "Au revoir, à plus tard!", isCorrect: false },
        { id: "4", text: "Bonjour, d'où venez-vous?", isCorrect: false }
      ]
    },
    {
      id: "en-match-1",
      type: "matching",
      pairs: [
        { id: "1", sourceText: "hello", targetText: "bonjour" },
        { id: "2", sourceText: "thank you", targetText: "merci" },
        { id: "3", sourceText: "goodbye", targetText: "au revoir" },
        { id: "4", sourceText: "please", targetText: "s'il vous plaît" }
      ]
    },
    {
      id: "en-fill-1",
      type: "fill-blank",
      sentence: "I would ______ a coffee, please.",
      options: [
        { id: "1", text: "like", isCorrect: true },
        { id: "2", text: "want", isCorrect: false },
        { id: "3", text: "am", isCorrect: false },
        { id: "4", text: "have", isCorrect: false }
      ],
      blankPosition: 2
    },
    {
      id: "en-mc-2",
      type: "multiple-choice",
      question: "Select the correct translation to Spanish",
      prompt: "My name is John.",
      options: [
        { id: "1", text: "Me llamo John.", isCorrect: true },
        { id: "2", text: "Yo llamo John.", isCorrect: false },
        { id: "3", text: "Llámame John.", isCorrect: false },
        { id: "4", text: "Me gusta John.", isCorrect: false }
      ]
    },
    {
      id: "en-fill-2",
      type: "fill-blank",
      sentence: "There are ______ people in the room.",
      options: [
        { id: "1", text: "three", isCorrect: true },
        { id: "2", text: "tree", isCorrect: false },
        { id: "3", text: "the three", isCorrect: false },
        { id: "4", text: "third", isCorrect: false }
      ],
      blankPosition: 2
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
