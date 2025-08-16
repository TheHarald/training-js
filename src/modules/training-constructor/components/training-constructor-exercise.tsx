import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { TTrainingExercise } from "../../../types/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { trainingConstructorStore } from "../services/training-constructor-store";

type TProps = {
  exercise: TTrainingExercise;
};

export const TrainingConstructorExercise = observer<TProps>((props) => {
  const { exercise } = props;

  const { name, repeats, duration, type, id } = exercise;

  return (
    <Card>
      <CardBody className="flex flex-row gap-2 py-1">
        {type === "repeatable" ? (
          <div className="flex flex-row gap-2 text-xl font-medium items-center">
            {`${name}, ${repeats} повторений`}
          </div>
        ) : null}

        {type === "timed" || type === "rest" ? (
          <div className="flex flex-row gap-2 text-xl font-medium items-center">
            {`${name}, ${duration} секунд`}
          </div>
        ) : null}
      </CardBody>
      <CardFooter className=" flex flex-row gap-2 justify-end py-2">
        <Button
          onPress={() => trainingConstructorStore.deleteExercise(id)}
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
