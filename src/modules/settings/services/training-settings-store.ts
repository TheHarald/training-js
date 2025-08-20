import { makeAutoObservable } from "mobx";
import { TypedStorage } from "../../../utils/storage";
import type { TTrainingAppSettings } from "./types";
import { trainingAppSettingsKey } from "../../../constants";

const defaultSettings: TTrainingAppSettings = {
  autoRunExercises: false,
  isRequestWeight: false,
};

const settingsStorage = new TypedStorage<TTrainingAppSettings>(
  trainingAppSettingsKey,
  defaultSettings
);

class TrainingSettingsStore {
  settings: TTrainingAppSettings = settingsStorage.get() ?? defaultSettings;

  constructor() {
    makeAutoObservable(this);
  }

  public updateSettings(settings: Partial<TTrainingAppSettings>) {
    this.settings = {
      ...this.settings,
      ...settings,
    };

    settingsStorage.set({
      ...this.settings,
      ...settings,
    });
  }
}

export const trainingSettingsStore = new TrainingSettingsStore();
