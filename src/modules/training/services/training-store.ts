import { makeAutoObservable } from "mobx";
import { trainingConstructorStore } from "../../training-constructor/services/training-constructor-store";
import { navigationStore } from "../../navigation/services/navigation-store";
import { AppRoutes } from "../../navigation/services/types";
import { trainingStorageHelper } from "../../../helpers/training-storage-helper";
import { addToast } from "@heroui/react";
import {
  TExerciseType,
  type IRestItem,
  type TWorkoutPlan,
} from "../../../types/types";

class TrainingStore {
  trainings: TWorkoutPlan[] = [];
  playedTraining: TWorkoutPlan | undefined = undefined;
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

  public editTraining(training: TWorkoutPlan) {
    trainingConstructorStore.setTrainingPlan(training);
    navigationStore.setTab(AppRoutes.Constructor);
  }

  public exportToText(training: TWorkoutPlan) {
    const text = training.exercises
      .map((exercise, index) => {
        let exerciseName = exercise.name;

        if (exercise.type === TExerciseType.Quantitative) {
          exerciseName = `${exerciseName}, ${exercise.repeats} раз`;
        }

        if (exercise.type === TExerciseType.Timed) {
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

  public selectTraining(training: TWorkoutPlan) {
    const { exercises, rounds, roundsRestDuration, exerciseRestDuration } =
      training;

    if (exercises.length === 0) {
      addToast({
        color: "danger",
        title: "В тренировке нет упражнений",
      });

      return;
    }

    const trainingWithRests: TWorkoutPlan = {
      ...training,
      exercises: [],
    };

    for (let round = 0; round < rounds; round++) {
      // Добавляем упражнения текущего круга с отдыхом между ними
      exercises.forEach((exercise, index) => {
        // Добавляем текущее упражнение
        trainingWithRests.exercises.push(exercise);

        // Добавляем отдых после каждого упражнения, кроме последнего в круге
        if (index < exercises.length - 1) {
          const restExercise: IRestItem = {
            id: crypto.randomUUID(),
            name: "Отдых",
            type: TExerciseType.Rest,
            duration: exerciseRestDuration,
          };
          trainingWithRests.exercises.push(restExercise);
        }
      });

      // Добавляем отдых между кругами, кроме последнего круга
      if (round < rounds - 1) {
        const circleRest: IRestItem = {
          id: crypto.randomUUID(),
          name: "Отдых между кругами",
          type: TExerciseType.Rest,
          duration: roundsRestDuration,
        };
        trainingWithRests.exercises.push(circleRest);
      }
    }

    this.playedTraining = trainingWithRests;
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
