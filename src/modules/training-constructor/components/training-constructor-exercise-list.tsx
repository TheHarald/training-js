import { observer } from "mobx-react-lite";
import { TrainingConstructorExercise } from "./training-constructor-exercise";
import { trainingConstructorStore } from "../services/training-constructor-store";
import { Button, Input, ScrollShadow } from "@heroui/react";
import {
  Battery50Icon,
  CheckCircleIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

export const TrainingConstructorExerciseList = observer(() => {
  const { exercises, canCreateTraining, trainingName } =
    trainingConstructorStore;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          onChange={(e) =>
            trainingConstructorStore.setTrainingName(e.target.value)
          }
          value={trainingName}
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
          <Battery50Icon className="size-6" />
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
      <ScrollShadow hideScrollBar className="h-[500px]">
        <div className="flex flex-col gap-2">
          {exercises.map((exercise) => (
            <TrainingConstructorExercise
              key={exercise.id}
              exercise={exercise}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
});
