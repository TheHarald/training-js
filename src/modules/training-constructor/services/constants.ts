import {
  TExerciseType,
  type TExercise,
  type TWorkoutPlan,
} from "../../../types/types";

export const newTrainingPlanId = "new-training-plan";

export const durations = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100, 105, 110, 115, 120,
];

export const defaultDuration = durations[5];

export const defaultQuantitativeExercise: TExercise = {
  id: "",
  name: "",
  repeats: 20,
  type: TExerciseType.Quantitative,
};
export const defaultTimedExercise: TExercise = {
  id: "",
  name: "",
  duration: defaultDuration,
  type: TExerciseType.Timed,
};

export const defaultTTrainingPlan: TWorkoutPlan = {
  id: newTrainingPlanId,
  exerciseRestDuration: defaultDuration,
  roundsRestDuration: defaultDuration,
  rounds: 1,
  name: "",
  exercises: [],
};
