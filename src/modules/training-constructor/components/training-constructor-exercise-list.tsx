import { observer } from "mobx-react-lite";
import { TrainingConstructorExercise } from "./training-constructor-exercise";
import { trainingConstructorStore } from "../services/training-constructor-store";
import { Button, Input, ScrollShadow } from "@heroui/react";
import {
  CheckCircleIcon,
  PauseCircleIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

export const TrainingConstructorExerciseList = observer(() => {
  const { canCreateTraining, trainingPlan } = trainingConstructorStore;
  const { exercises, name } = trainingPlan;
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <div className="flex flex-row gap-2">
        <Input
          onChange={(e) =>
            trainingConstructorStore.setTrainingName(e.target.value)
          }
          value={name}
          placeholder="Введите название тренировки"
        />
        <Button
          color="primary"
          onPress={() => trainingConstructorStore.addExercise()}
          isIconOnly
        >
          <SquaresPlusIcon className="size-6" />
        </Button>
        <Button
          isIconOnly
          color="secondary"
          onPress={() => trainingConstructorStore.addRestExercise()}
        >
          <PauseCircleIcon className="size-6" />
        </Button>
        <Button
          isDisabled={!canCreateTraining}
          isIconOnly
          color="success"
          onPress={() => trainingConstructorStore.addTrainingPlan()}
        >
          <CheckCircleIcon className="size-6" />
        </Button>
      </div>
      <ScrollShadow hideScrollBar>
        <div className="flex flex-col gap-2 min-h-full">
          {exercises.length ? (
            exercises.map((exercise) => (
              <TrainingConstructorExercise
                key={exercise.id}
                exercise={exercise}
              />
            ))
          ) : (
            <div className="text-center self-center">Упражнений пока нет</div>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
});
