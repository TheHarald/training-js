import type { TTrainingExercise } from "../../../types/types";

export const defaultTrainingExercise: TTrainingExercise = {
  id: "",
  name: "",
  repeats: 0,
  duration: 0,
};

export const exerciseDurations = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100, 105, 110, 115, 120,
];

export const defaultExerciseDuration = exerciseDurations[5];
