// store/workout.ts

import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ExerciseInstance {
  id: string;
  exerciseName: string;
}

export interface Set {
  id: number;
  exerciseInstanceId: string;
  distance?: string;
  time?: string;
  weight?: string;
  reps?: string;
}

export interface Workout {
  name: string;
  volume: string;
  duration: string;
  sets: Set[];
  createdAt?: string;
  exercises: ExerciseInstance[];
}

const storage = createJSONStorage<Workout>(() => AsyncStorage);

const content: Workout = {
  name: "",
  volume: "",
  duration: "",
  sets: [],
  createdAt: undefined,
  exercises: [],
};

export const createWorkoutAtom = atomWithStorage<Workout>(
  "workout",
  content,
  storage,
);
