import { makeAutoObservable } from "mobx";
import type { TTrainingPlan } from "../../../types/types";
import { trainingListStorageKey } from "../../../constants";

class TrainingStore {
  trainings: TTrainingPlan[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public getTrainings() {
    try {
      const trainings = localStorage.getItem(trainingListStorageKey);

      this.trainings = JSON.parse(trainings || "[]");
    } catch (e) {
      console.log(e);
    }
  }
}

export const trainingStore = new TrainingStore();
