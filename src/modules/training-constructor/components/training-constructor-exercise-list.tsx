import { observer } from "mobx-react-lite";
import { TrainingConstructorExercise } from "./training-constructor-exercise";
import { trainingConstructorStore } from "../services/training-constructor-store";
import { Button } from "@heroui/react";

export const TrainingConstructorExerciseList = observer(() => {
  const { exercises } = trainingConstructorStore;
  return (
    <div className="flex flex-col gap-2">
      {exercises.map((exercise) => (
        <TrainingConstructorExercise key={exercise.id} exercise={exercise} />
      ))}
      <Button onPress={() => trainingConstructorStore.addExercise()}>
        Добавить
      </Button>
    </div>
  );
});
