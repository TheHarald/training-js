import { makeAutoObservable } from "mobx";
import type {
  TTrainingExercise,
  TTrainingExerciseType,
  TTrainingPlan,
} from "../../../types/types";
import { defaultExerciseDuration, defaultTrainingExercise } from "./constants";
import { trainingListStorageKey } from "../../../constants";

class TrainingConstructorStore {
  exercises: TTrainingExercise[] = [];
  trainingName: string = "";
  isEditing: boolean = false;
  editingExercise: TTrainingExercise = defaultTrainingExercise;

  constructor() {
    makeAutoObservable(this);
  }

  get canConfirmEditing() {
    return Boolean(this.editingExercise.name);
  }

  get canCreateTraining() {
    return Boolean(this.exercises.length && this.trainingName);
  }

  public addTrainingPlan() {
    const data = localStorage.getItem(trainingListStorageKey);

    const trainings = JSON.parse(data || "[]") as TTrainingPlan[];

    localStorage.setItem(
      trainingListStorageKey,
      JSON.stringify([
        ...trainings,
        {
          name: this.trainingName,
          exercises: this.exercises,
          id: crypto.randomUUID(),
        },
      ])
    );

    this.trainingName = "";
    this.exercises = [];
  }

  public setTrainingName(name: string) {
    this.trainingName = name;
  }

  public editExercise(exercise: TTrainingExercise) {
    this.isEditing = true;
    this.editingExercise = { ...exercise };
  }

  public moveExercise(exercise: TTrainingExercise, direction: "up" | "down") {
    const index = this.exercises.findIndex((item) => item.id === exercise.id);

    if (index === -1) return;

    if (direction === "up") {
      if (index > 0) {
        // Меняем местами текущий элемент с предыдущим
        [this.exercises[index - 1], this.exercises[index]] = [
          this.exercises[index],
          this.exercises[index - 1],
        ];
      }
    }

    if (direction === "down") {
      if (index < this.exercises.length - 1) {
        // Меняем местами текущий элемент со следующим
        [this.exercises[index], this.exercises[index + 1]] = [
          this.exercises[index + 1],
          this.exercises[index],
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
    this.exercises.push({
      id: crypto.randomUUID(),
      type: "rest",
      duration: 60,
      repeats: 1,
      name: "Отдых",
    });
  }

  public confirmEditing() {
    this.isEditing = false;

    const index = this.exercises.findIndex(
      (exercise) => exercise.id === this.editingExercise.id
    );

    if (index === -1) {
      this.exercises.push(this.editingExercise);
    } else {
      this.exercises.splice(index, 1, this.editingExercise);
    }

    this.editingExercise = { ...defaultTrainingExercise };
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
    console.log(defaultExerciseDuration);
    this.isEditing = true;
    this.editingExercise = {
      ...defaultTrainingExercise,
      repeats: 20,
      duration: defaultExerciseDuration,
      id: crypto.randomUUID(),
    };
  }

  public deleteExercise(id: string) {
    const index = this.exercises.findIndex((exercise) => exercise.id === id);

    if (index === -1) return;

    this.exercises.splice(index, 1);
  }
}

export const trainingConstructorStore = new TrainingConstructorStore();
