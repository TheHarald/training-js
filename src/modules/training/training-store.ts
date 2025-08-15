import { makeAutoObservable } from "mobx";

class TrainingStore {
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public increment(counter: number) {
    this.counter += counter;
  }
}

export const trainingStore = new TrainingStore();
