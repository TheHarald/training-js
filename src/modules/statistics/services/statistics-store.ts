import { makeAutoObservable } from "mobx";
import { TypedStorage } from "../../../utils/storage";
import {
  trainingDatesStatisticsKey,
  trainingWeightsStatisticsKey,
} from "../../../constants";
import type { TStatisticWeightData } from "./statistic-types";
import { weightRequestDelayMs } from "./statistic-constants";
import { trainingSettingsStore } from "../../settings/services/training-settings-store";

const statisticsWeightStorage = new TypedStorage<TStatisticWeightData[]>(
  trainingWeightsStatisticsKey,
  []
);

const trainingDatesStatistics = new TypedStorage<number[]>(
  trainingDatesStatisticsKey,
  []
);
class StatisticsStore {
  weight: number = statisticsWeightStorage.get().at(-1)?.weight ?? 50;
  weights: TStatisticWeightData[] = statisticsWeightStorage.get();
  trainingDays: number[] = trainingDatesStatistics.get();
  weightModalOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setWeight(weight: number) {
    this.weight = weight;
  }

  public setOpen(open: boolean): void {
    this.weightModalOpen = open;
  }

  public addTrainingDate(date: number) {
    this.trainingDays.push(date);
    trainingDatesStatistics.set(this.trainingDays);
  }

  public tryRequestWeight() {
    if (!trainingSettingsStore.settings.isRequestWeight) return;

    const lastWight = this.weights.at(-1);

    if (lastWight === undefined) {
      this.weightModalOpen = true;
      return;
    }

    const now = Date.now();

    if (now - lastWight.date > weightRequestDelayMs) {
      this.weightModalOpen = true;
    }
  }

  public confirmWeight() {
    const weightData: TStatisticWeightData = {
      date: Date.now(),
      weight: this.weight,
    };

    this.weights.push(weightData);

    statisticsWeightStorage.set(this.weights);

    this.weightModalOpen = false;
  }
}

export const statisticsStore = new StatisticsStore();
