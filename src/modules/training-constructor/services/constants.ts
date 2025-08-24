import type { TTrainingExercise, TTrainingPlan } from "../../../types/types";

export const defaultTrainingExercise: TTrainingExercise = {
  id: "",
  name: "",
  repeats: 1,
  duration: 1,
  type: "repeatable",
};

export const newTrainingPlanId = "new-training-plan";

export const defaultTTrainingPlan: TTrainingPlan = {
  id: newTrainingPlanId,
  name: "",
  exercises: [],
};

export const exerciseDurations = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100, 105, 110, 115, 120,
];

export const defaultExerciseDuration = exerciseDurations[5];
