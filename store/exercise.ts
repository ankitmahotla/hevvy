import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define all possible measurement properties
enum MeasurementProperty {
  REPS = "REPS",
  KG = "KG",
  TIME = "TIME",
  KM = "KM",
  NEGATIVE_KG = "-KG",
}

// Define the exercise types enum to match your array
export enum ExerciseType {
  WEIGHT_REPS = 1,
  BODYWEIGHT_REPS = 2,
  WEIGHTED_BODYWEIGHT = 3,
  ASSISTED_BODYWEIGHT = 4,
  DURATION = 5,
  DURATION_WEIGHT = 6,
  DISTANCE_DURATION = 7,
  WEIGHT_DISTANCE = 8,
}

// Define the exercise type info interface matching your array
export interface ExerciseTypeInfo {
  id: ExerciseType;
  name: string;
  example: string;
  properties: MeasurementProperty[];
}

// Your exercise types array with proper typing
export const exerciseTypes: ExerciseTypeInfo[] = [
  {
    id: ExerciseType.WEIGHT_REPS,
    name: "Weight & Reps",
    example: "Bench Press, Dumbbell Curls",
    properties: [MeasurementProperty.REPS, MeasurementProperty.KG],
  },
  {
    id: ExerciseType.BODYWEIGHT_REPS,
    name: "Bodyweight Reps",
    example: "Pushups, Sit ups, Burpees",
    properties: [MeasurementProperty.REPS],
  },
  {
    id: ExerciseType.WEIGHTED_BODYWEIGHT,
    name: "Weighted Bodyweight",
    example: "Weighted Pull Ups, Weighted Dips",
    properties: [MeasurementProperty.REPS, MeasurementProperty.KG],
  },
  {
    id: ExerciseType.ASSISTED_BODYWEIGHT,
    name: "Assisted Bodyweight",
    example: "Assisted Pullups, Assisted Dips",
    properties: [MeasurementProperty.REPS, MeasurementProperty.NEGATIVE_KG],
  },
  {
    id: ExerciseType.DURATION,
    name: "Duration",
    example: "Planks, Yoga, Stretching",
    properties: [MeasurementProperty.TIME],
  },
  {
    id: ExerciseType.DURATION_WEIGHT,
    name: "Duration & Weight",
    example: "Weighted Plank, Wall Sit",
    properties: [MeasurementProperty.KG, MeasurementProperty.TIME],
  },
  {
    id: ExerciseType.DISTANCE_DURATION,
    name: "Distance & Duration",
    example: "Running, Cycling, Rowing",
    properties: [MeasurementProperty.TIME, MeasurementProperty.KM],
  },
  {
    id: ExerciseType.WEIGHT_DISTANCE,
    name: "Weight & Distance",
    example: "Farmers Walk, Suitcase Carry",
    properties: [MeasurementProperty.KG, MeasurementProperty.KM],
  },
];

export interface Exercise {
  name: string;
  equipment: string;
  primaryMuscleGroup: string;
  otherMuscleGroups?: string[];
  exerciseTypeId: ExerciseType; // Store the ID/enum value
}

export const createExerciseAtom = atom<Exercise>({
  name: "",
  equipment: "",
  primaryMuscleGroup: "",
  otherMuscleGroups: [],
  exerciseTypeId: ExerciseType.BODYWEIGHT_REPS, // Default
});

const storage = createJSONStorage<Exercise[]>(() => AsyncStorage);
const content: Exercise[] = [];

export const exercisesAtom = atomWithStorage<Exercise[]>(
  "exercises",
  content,
  storage,
);
