import { Lesson, Unit } from "@/types";

// Basic lessons structure for each language
const createBasicLessons = (): Lesson[] => [
  {
    id: 1,
    title: "Lesson 1",
    description: "Greetings & Introductions",
    progress: 100,
    isCompleted: true,
    isLocked: false,
    unitId: 1
  },
  {
    id: 2,
    title: "Lesson 2",
    description: "Basic Phrases",
    progress: 100,
    isCompleted: true,
    isLocked: false,
    unitId: 1
  },
  {
    id: 3,
    title: "Lesson 3",
    description: "Numbers & Counting",
    progress: 70,
    isCompleted: false,
    isLocked: false,
    unitId: 1
  },
  {
    id: 4,
    title: "Lesson 4",
    description: "Food & Drink",
    progress: 0,
    isCompleted: false,
    isLocked: false,
    unitId: 1
  },
  {
    id: 5,
    title: "Lesson 5",
    description: "Family Members",
    progress: 0,
    isCompleted: false,
    isLocked: false,
    unitId: 1
  },
  {
    id: 6,
    title: "Lesson 6",
    description: "Common Verbs",
    progress: 0,
    isCompleted: false,
    isLocked: true,
    unitId: 1
  }
];

// Create unit 2 lessons (all locked for now)
const createAdvancedLessons = (): Lesson[] => [
  {
    id: 7,
    title: "Lesson 1",
    description: "Travel Phrases",
    progress: 0,
    isCompleted: false,
    isLocked: true,
    unitId: 2
  },
  {
    id: 8,
    title: "Lesson 2",
    description: "Shopping Vocabulary",
    progress: 0,
    isCompleted: false,
    isLocked: true,
    unitId: 2
  },
  {
    id: 9,
    title: "Lesson 3",
    description: "Directions & Locations",
    progress: 0,
    isCompleted: false,
    isLocked: true,
    unitId: 2
  },
  {
    id: 10,
    title: "Lesson 4",
    description: "Weather & Seasons",
    progress: 0,
    isCompleted: false,
    isLocked: true,
    unitId: 2
  }
];

// Define units with lessons
const createUnits = (): Unit[] => [
  {
    id: 1,
    title: "Unit 1: Basics",
    isLocked: false,
    lessons: createBasicLessons()
  },
  {
    id: 2,
    title: "Unit 2: Phrases",
    isLocked: false, // The unit itself is not locked, but its lessons are
    lessons: createAdvancedLessons()
  }
];

// Language-specific lesson maps
const lessonsMap: Record<string, Unit[]> = {
  french: createUnits(),
  spanish: createUnits(),
  german: createUnits(),
  english: createUnits()
};

export const getLessonsForLanguage = (languageId: string): Unit[] => {
  return lessonsMap[languageId] || [];
};
