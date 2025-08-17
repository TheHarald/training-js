import { makeAutoObservable } from "mobx";
import type { TTrainingPlan } from "../../../types/types";
import { trainingConstructorStore } from "../../training-constructor/services/training-constructor-store";
import { navigationStore } from "../../navigation/services/navigation-store";
import { AppRoutes } from "../../navigation/services/types";
import { trainingStorageHelper } from "../../../services/training-storage-helper";

class TrainingStore {
  trainings: TTrainingPlan[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public getTrainings() {
    const trainings = trainingStorageHelper.get() ?? [];

    this.trainings = trainings;
  }

  public editTraining(training: TTrainingPlan) {
    trainingConstructorStore.setTrainingPlan(training);
    navigationStore.setTab(AppRoutes.TrainingConstructor);
  }

  public deleteTraining(id: string) {
    const newItems = this.trainings.filter((training) => {
      return training.id !== id;
    });

    this.trainings = newItems;

    trainingStorageHelper.set(newItems);
  }
}

export const trainingStore = new TrainingStore();
