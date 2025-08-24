import { makeAutoObservable } from "mobx";
import {
  defaultDuration,
  defaultQuantitativeExercise,
  defaultTimedExercise,
  defaultTTrainingPlan,
  newTrainingPlanId,
} from "./constants";
import { trainingStorageHelper } from "../../../helpers/training-storage-helper";
import { navigationStore } from "../../navigation/services/navigation-store";
import { AppRoutes } from "../../navigation/services/types";
import {
  TExerciseType,
  type TExercise,
  type TWorkoutPlan,
} from "../../../types/types";

class TrainingConstructorStore {
  isEditing: boolean = false;
  editingExercise: TExercise = defaultTimedExercise;
  trainingPlan: TWorkoutPlan = defaultTTrainingPlan;

  constructor() {
    makeAutoObservable(this);
  }

  get canConfirmEditing() {
    return Boolean(this.editingExercise.name);
  }

  get canCreateTraining() {
    return Boolean(
      this.trainingPlan.exercises.length && this.trainingPlan.name
    );
  }

  public setExerciseRestDuration(duration: number) {
    this.trainingPlan.exerciseRestDuration = duration;
  }
  public setRoundsRestDuration(duration: number) {
    this.trainingPlan.roundsRestDuration = duration;
  }

  public setRoundsCount(count: number) {
    this.trainingPlan.rounds = count;
  }

  public addTrainingPlan() {
    const trainings = trainingStorageHelper.get();
    let newItems: TWorkoutPlan[] = [];

    // new
    if (this.trainingPlan.id === newTrainingPlanId) {
      newItems = [
        ...trainings,
        {
          ...this.trainingPlan,
          id: crypto.randomUUID(),
        },
      ];
    } else {
      newItems = trainings.map((item) => {
        if (item.id === this.trainingPlan.id) {
          return {
            ...this.trainingPlan,
          };
        }

        return item;
      });
    }

    trainingStorageHelper.set(newItems);

    this.trainingPlan = defaultTTrainingPlan;

    navigationStore.setTab(AppRoutes.Training);
  }

  public setTrainingName(name: string) {
    this.trainingPlan.name = name;
  }

  public editExercise(exercise: TExercise) {
    this.isEditing = true;
    this.editingExercise = { ...exercise };
  }

  public moveExercise(exercise: TExercise, direction: "up" | "down") {
    const index = this.trainingPlan.exercises.findIndex(
      (item) => item.id === exercise.id
    );

    if (index === -1) return;

    if (direction === "up") {
      if (index > 0) {
        // Меняем местами текущий элемент с предыдущим
        [
          this.trainingPlan.exercises[index - 1],
          this.trainingPlan.exercises[index],
        ] = [
          this.trainingPlan.exercises[index],
          this.trainingPlan.exercises[index - 1],
        ];
      }
    }

    if (direction === "down") {
      if (index < this.trainingPlan.exercises.length - 1) {
        // Меняем местами текущий элемент со следующим
        [
          this.trainingPlan.exercises[index],
          this.trainingPlan.exercises[index + 1],
        ] = [
          this.trainingPlan.exercises[index + 1],
          this.trainingPlan.exercises[index],
        ];
      }
    }
  }

  public cancelEditing() {
    this.isEditing = false;
    this.editingExercise = {
      ...defaultTimedExercise,
    };
  }

  public confirmEditing() {
    this.isEditing = false;

    const index = this.trainingPlan.exercises.findIndex(
      (exercise) => exercise.id === this.editingExercise.id
    );

    if (index === -1) {
      this.trainingPlan.exercises.push(this.editingExercise);
    } else {
      this.trainingPlan.exercises.splice(index, 1, this.editingExercise);
    }

    this.editingExercise = { ...defaultTimedExercise };
  }

  public resetConstructor() {
    this.trainingPlan = {
      ...defaultTTrainingPlan,
    };
    this.editingExercise = {
      ...defaultTimedExercise,
    };
  }

  public setExerciseName(name: string) {
    this.editingExercise.name = name;
  }

  public setExerciseDuration(duration: number) {
    if (Number.isNaN(duration)) {
      duration = defaultDuration;
    }

    if (this.editingExercise.type === TExerciseType.Timed) {
      this.editingExercise.duration = duration;
    }
  }

  public setExerciseRepeats(repeats: number) {
    if (this.editingExercise.type === TExerciseType.Quantitative) {
      this.editingExercise.repeats = repeats;
    }
  }

  public addExercise(type: TExerciseType) {
    this.isEditing = true;

    if (type === TExerciseType.Quantitative) {
      this.editingExercise = {
        ...defaultQuantitativeExercise,
        id: crypto.randomUUID(),
      };

      return;
    }

    if (type === TExerciseType.Timed) {
      this.editingExercise = {
        ...defaultTimedExercise,
        id: crypto.randomUUID(),
      };

      return;
    }
  }

  public deleteExercise(id: string) {
    const index = this.trainingPlan.exercises.findIndex(
      (exercise) => exercise.id === id
    );

    if (index === -1) return;

    this.trainingPlan.exercises.splice(index, 1);
  }

  public duplicateExercise(exercise: TExercise) {
    this.trainingPlan.exercises.push({
      ...exercise,
      id: crypto.randomUUID(),
    });
  }

  public setTrainingPlan(training: TWorkoutPlan) {
    this.trainingPlan = { ...training };
  }
}

export const trainingConstructorStore = new TrainingConstructorStore();
