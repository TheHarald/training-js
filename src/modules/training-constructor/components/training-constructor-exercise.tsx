import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { TTrainingExercise } from "../../../types/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { trainingConstructorStore } from "../services/training-constructor-store";

type TProps = {
  exercise: TTrainingExercise;
};

export const TrainingConstructorExercise = observer<TProps>((props) => {
  const { exercise } = props;

  return (
    <Card>
      <CardHeader>{exercise.name}</CardHeader>
      <CardBody className="flex flex-col gap-1">
        <div>{`Количество повторений: ${exercise.repeats}`}</div>
        <div>{`Длительность: ${exercise.duration}`}</div>
      </CardBody>
      <CardFooter className=" flex flex-row gap-2 justify-end">
        <Button
          onPress={() => trainingConstructorStore.deleteExercise(exercise.id)}
          color="danger"
          isIconOnly
        >
          <TrashIcon className="size-6" />
        </Button>
        <Button
          onPress={() => trainingConstructorStore.editExercise(exercise)}
          color="primary"
          isIconOnly
        >
          <PencilSquareIcon className="size-6" />
        </Button>
      </CardFooter>
    </Card>
  );
});
