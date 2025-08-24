import { trainingListStorageKey } from "../constants";
import type { TWorkoutPlan } from "../types/types";
import { TypedStorage } from "../utils/storage";

export const trainingStorageHelper = new TypedStorage<TWorkoutPlan[]>(
  trainingListStorageKey,
  []
);
