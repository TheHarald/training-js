import { makeAutoObservable } from "mobx";
import type {
  TTrainingExercise,
  TTrainingExerciseType,
  TTrainingPlan,
} from "../../../types/types";
import {
  defaultExerciseDuration,
  defaultTrainingExercise,
  defaultTTrainingPlan,
  newTrainingPlanId,
} from "./constants";
import { trainingStorageHelper } from "../../../helpers/training-storage-helper";
import { navigationStore } from "../../navigation/services/navigation-store";
import { AppRoutes } from "../../navigation/services/types";

class TrainingConstructorStore {
  isEditing: boolean = false;
  editingExercise: TTrainingExercise = defaultTrainingExercise;
  trainingPlan: TTrainingPlan = defaultTTrainingPlan;

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

  public addTrainingPlan() {
    const trainings = trainingStorageHelper.get();
    let newItems: TTrainingPlan[] = [];

    // new
    if (this.trainingPlan.id === newTrainingPlanId) {
      newItems = [
        ...trainings,
        {
          name: this.trainingPlan.name,
          exercises: this.trainingPlan.exercises,
          id: crypto.randomUUID(),
        },
      ];
    } else {
      newItems = trainings.map((item) => {
        if (item.id === this.trainingPlan.id) {
          return {
            ...item,
            name: this.trainingPlan.name,
            exercises: this.trainingPlan.exercises,
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

  public editExercise(exercise: TTrainingExercise) {
    this.isEditing = true;
    this.editingExercise = { ...exercise };
  }

  public moveExercise(exercise: TTrainingExercise, direction: "up" | "down") {
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
      ...defaultTrainingExercise,
    };
  }

  public setExerciseType(type: TTrainingExerciseType) {
    this.editingExercise.type = type;
  }

  public addRestExercise() {
    this.trainingPlan.exercises.push({
      id: crypto.randomUUID(),
      type: "rest",
      duration: 60,
      repeats: 1,
      name: "Отдых",
    });
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

    this.editingExercise = { ...defaultTrainingExercise };
  }

  public resetConstructor() {
    this.trainingPlan = {
      ...defaultTTrainingPlan,
    };
    this.editingExercise = {
      ...defaultTrainingExercise,
    };
  }

  public setExerciseName(name: string) {
    this.editingExercise.name = name;
  }

  public setExerciseDuration(duration: number) {
    if (Number.isNaN(duration)) {
      duration = defaultExerciseDuration;
    }

    this.editingExercise.duration = duration;
  }

  public setExerciseRepeats(repeats: number) {
    this.editingExercise.repeats = repeats;
  }

  public addExercise() {
    this.isEditing = true;
    this.editingExercise = {
      ...defaultTrainingExercise,
      repeats: 20,
      duration: defaultExerciseDuration,
      id: crypto.randomUUID(),
    };
  }

  public deleteExercise(id: string) {
    const index = this.trainingPlan.exercises.findIndex(
      (exercise) => exercise.id === id
    );

    if (index === -1) return;

    this.trainingPlan.exercises.splice(index, 1);
  }

  public duplicateExercise(exercise: TTrainingExercise) {
    this.trainingPlan.exercises.push({
      ...exercise,
      id: crypto.randomUUID(),
    });
  }

  public setTrainingPlan(training: TTrainingPlan) {
    this.trainingPlan = { ...training };
  }
}

export const trainingConstructorStore = new TrainingConstructorStore();
