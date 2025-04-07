import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { Exercise } from "./exercise";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Set {
  exercise: Exercise;
  distance?: string;
  time?: string;
  weight?: string;
  reps?: string;
}

interface Workout {
  name: string;
  volume: string;
  duration: string;
  sets: Set[];
  created_at: Date;
  exercises: string[];
}

const storage = createJSONStorage<Workout>(() => AsyncStorage);
const content: Workout = {
  name: "",
  volume: "",
  duration: "",
  sets: [],
  created_at: new Date(),
  exercises: [],
};

export const createWorkoutAtom = atomWithStorage<Workout>(
  "workout",
  content,
  storage,
);
