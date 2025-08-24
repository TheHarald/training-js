interface IBaseExercise {
  id: string;
  name: string;
  description?: string;
}

export enum TExerciseType {
  Quantitative = "quantitative",
  Timed = "timed",
  Rest = "rest",
}

// Тип для упражнения с количеством повторений
interface IQuantitativeExercise extends IBaseExercise {
  type: TExerciseType.Quantitative;
  repeats: number;
}

// Тип для упражнения на время
interface ITimedExercise extends IBaseExercise {
  type: TExerciseType.Timed;
  duration: number; // в секундах
}

export interface IRestItem extends IBaseExercise {
  type: TExerciseType.Rest;
  duration: number; // в секундах
}

export type TExercise = IQuantitativeExercise | ITimedExercise | IRestItem;

export type TWorkoutPlan = {
  id: string;
  name: string;
  description?: string;
  rounds: number;
  exerciseRestDuration: number; // отдых между упражнениями в секундах
  roundsRestDuration: number; // отдых после каждой группы упражнений в секундах
  exercises: TExercise[];
};
