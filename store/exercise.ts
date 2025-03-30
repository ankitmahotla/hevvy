import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface exerciseType {
  name: string;
  equipment: string;
  primaryMuscleGroup: string;
  otherMuscleGroups: string[];
}

export const createExerciseAtom = atom<exerciseType>({
  name: "",
  equipment: "",
  primaryMuscleGroup: "",
  otherMuscleGroups: [],
});

const storage = createJSONStorage<exerciseType[]>(() => AsyncStorage);
const content: exerciseType[] = [];

export const exerciseAtom = atomWithStorage<exerciseType[]>(
  "exercises",
  content,
  storage,
);
