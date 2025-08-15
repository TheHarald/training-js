import { makeAutoObservable } from "mobx";
import { AppRoutes } from "./types";

class NavigationStore {
  tab: AppRoutes = AppRoutes.Training;

  constructor() {
    makeAutoObservable(this);
  }

  public setTab(tab: AppRoutes) {
    this.tab = tab;
  }
}

export const navigationStore = new NavigationStore();
