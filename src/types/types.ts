export type TTrainingExercise = {
  id: string;
  name: string;
  repeats: number;
  duration: number;
};

export type TTrainingPlan = {
  id: string;
  name: string;
  exercises: TTrainingExercise[];
};
