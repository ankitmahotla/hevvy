import { atom } from "jotai";

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
