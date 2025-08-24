import { makeAutoObservable } from "mobx";
import type { TTrainingPlan } from "../../../types/types";
import { trainingConstructorStore } from "../../training-constructor/services/training-constructor-store";
import { navigationStore } from "../../navigation/services/navigation-store";
import { AppRoutes } from "../../navigation/services/types";
import { trainingStorageHelper } from "../../../helpers/training-storage-helper";
import { addToast } from "@heroui/react";

class TrainingStore {
  trainings: TTrainingPlan[] = [];
  playedTraining: TTrainingPlan | undefined = undefined;
  currentExerciseId: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get currentExercise() {
    return this.playedTraining?.exercises.find(
      (exercise) => exercise.id === this.currentExerciseId
    );
  }

  get progress() {
    const index = this.playedTraining?.exercises.findIndex(
      (exercise) => exercise.id === this.currentExerciseId
    );

    if (index === undefined || index === -1) {
      return 0;
    }

    return index + 1;
  }

  get nextExercise() {
    if (this.currentExerciseId === undefined) return undefined;
    if (this.playedTraining === undefined) return undefined;

    const index = this.playedTraining?.exercises.findIndex(
      (exercise) => exercise.id === this.currentExerciseId
    );

    if (index === -1 || index === undefined) return undefined;

    if (index + 1 < this.playedTraining?.exercises.length) {
      return this.playedTraining?.exercises[index + 1];
    }

    return undefined;
  }

  public getTrainings() {
    const trainings = trainingStorageHelper.get();

    this.trainings = trainings;
  }

  public editTraining(training: TTrainingPlan) {
    trainingConstructorStore.setTrainingPlan(training);
    navigationStore.setTab(AppRoutes.Constructor);
  }

  public exportToText(training: TTrainingPlan) {
    const text = training.exercises
      .map((exercise, index) => {
        let exerciseName = exercise.name;

        if (exercise.type === "repeatable") {
          exerciseName = `${exerciseName}, ${exercise.repeats} раз`;
        }

        if (exercise.type === "timed") {
          exerciseName = `${exerciseName}, ${exercise.duration} секунд`;
        }

        return `${index + 1}. ${exerciseName}`;
      })
      .join("\n");

    navigator.clipboard.writeText(text);

    addToast({
      color: "success",
      title: "Тренировка скопирована в буфер обмена",
    });
  }

  public deleteTraining(id: string) {
    const newItems = this.trainings.filter((training) => {
      return training.id !== id;
    });

    this.trainings = newItems;

    trainingStorageHelper.set(newItems);
  }

  public selectTraining(training: TTrainingPlan) {
    const { exercises } = training;

    if (exercises.length === 0) {
      addToast({
        color: "danger",
        title: "В тренировке нет упражнений",
      });

      return;
    }

    this.playedTraining = training;
    navigationStore.setIsDisabledNavigation(true);
  }

  public startTraining() {
    this.currentExerciseId = this.playedTraining?.exercises[0].id;
  }

  public stopTraining() {
    navigationStore.setIsDisabledNavigation(false);
    this.playedTraining = undefined;
    this.currentExerciseId = undefined;
  }

  public goToNextExercise() {
    const next = this.nextExercise;

    if (next === undefined) return;

    this.currentExerciseId = next.id;
  }
}

export const trainingStore = new TrainingStore();
