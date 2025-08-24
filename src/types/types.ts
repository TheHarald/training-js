export type TTrainingExerciseType = "repeatable" | "timed";

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
  restDuration: number;
  circlesCount: number;
  exercises: TTrainingExercise[];
};
