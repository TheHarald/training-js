export type TTrainingExerciseType = "repeatable" | "timed" | "rest";

export type TTrainingExercise = {
  id: string;
  name: string;
  repeats: number;
  duration: number;
  type: TTrainingExerciseType;
};

export type TTrainingPlan = {
  id: string;
  name: string;
  exercises: TTrainingExercise[];
};
