import { makeAutoObservable } from "mobx";
import type { TTrainingExercise } from "../../../types/types";
import { defaultExerciseDuration, defaultTrainingExercise } from "./constants";

class TrainingConstructorStore {
  exercises: TTrainingExercise[] = [];
  isEditing: boolean = false;
  editingExercise: TTrainingExercise = defaultTrainingExercise;

  constructor() {
    makeAutoObservable(this);
  }

  get canConfirmEditing() {
    return Boolean(
      this.editingExercise.name &&
        this.editingExercise.duration &&
        this.editingExercise.repeats
    );
  }

  public editExercise(exercise: TTrainingExercise) {
    this.isEditing = true;
    this.editingExercise = { ...exercise };
  }

  public cancelEditing() {
    this.isEditing = false;
    this.editingExercise = {
      ...defaultTrainingExercise,
    };
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
