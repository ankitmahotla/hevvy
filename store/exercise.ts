import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum ExerciseMeasurementType {
  REPS = "Reps",
  WEIGHTED = "+KG",
  ASSISTED = "-KG",
  KG = "KG",
  TIME = "Time",
  DISTANCE = "KM",
}

export interface Exercise {
  name: string;
  equipment: string;
  primaryMuscleGroup: string;
  otherMuscleGroups?: string[];
  measurementTypes: ExerciseMeasurementType[];
}

export const createExerciseAtom = atom<Exercise>({
  name: "",
  equipment: "",
  primaryMuscleGroup: "",
  otherMuscleGroups: [],
  measurementTypes: [],
});

const storage = createJSONStorage<Exercise[]>(() => AsyncStorage);
const content: Exercise[] = [];

export const exercisesAtom = atomWithStorage<Exercise[]>(
  "exercises",
  content,
  storage,
);
