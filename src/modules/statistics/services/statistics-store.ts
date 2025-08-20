import { makeAutoObservable } from "mobx";
import { TypedStorage } from "../../../utils/storage";
import { trainingStatisticsKey } from "../../../constants";
import type { TStatisticWeightData } from "./staticstic-types";
import { weightRequestDelayMs } from "./staticstic-constants";
import { trainingSettingsStore } from "../../settings/services/training-settings-store";

const statisticsStorage = new TypedStorage<TStatisticWeightData[]>(
  trainingStatisticsKey,
  []
);

class StatisticsStore {
  weight: number = statisticsStorage.get()?.at(-1)?.weight ?? 50;
  weights: TStatisticWeightData[] = statisticsStorage.get() ?? [];
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

    statisticsStorage.set(this.weights);

    this.weightModalOpen = false;
  }
}

export const statisticsStore = new StatisticsStore();
