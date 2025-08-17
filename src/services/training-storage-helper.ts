import { trainingListStorageKey } from "../constants";
import type { TTrainingPlan } from "../types/types";
import { TypedStorage } from "../utils/storage";

export const trainingStorageHelper = new TypedStorage<TTrainingPlan[]>(
  trainingListStorageKey,
  []
);
