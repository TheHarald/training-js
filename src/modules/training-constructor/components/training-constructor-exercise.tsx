import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import type { TTrainingExercise } from "../../../types/types";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { trainingConstructorStore } from "../services/training-constructor-store";

type TProps = {
  exercise: TTrainingExercise;
};

export const TrainingConstructorExercise = observer<TProps>((props) => {
  const { exercise } = props;

  const { name, repeats, duration, type, id } = exercise;

  return (
    <Card>
      <CardBody className="flex flex-row gap-2 py-1 justify-between">
        {type === "repeatable" ? (
          <div className="flex flex-row gap-2 text-l font-medium items-center">
            {`${name}, ${repeats} повторений`}
          </div>
        ) : null}

        {type === "timed" || type === "rest" ? (
          <div className="flex flex-row gap-2 text-l font-medium items-center">
            {`${name}, ${duration} секунд`}
          </div>
        ) : null}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" isIconOnly color="secondary">
              <EllipsisVerticalIcon className="size-6" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded">
            <DropdownItem
              key="edit-exercise"
              className="text-primary"
              startContent={<PencilSquareIcon className={"size-6"} />}
              onClick={() => trainingConstructorStore.editExercise(exercise)}
            >
              Редактировать
            </DropdownItem>
            <DropdownItem
              key="delete-exercise"
              className="text-danger"
              startContent={<TrashIcon className={"size-6"} />}
              onClick={() => trainingConstructorStore.deleteExercise(id)}
            >
              Удалить
            </DropdownItem>
            <DropdownItem
              key="up-exercise"
              className="text-secondary"
              startContent={<ArrowUpCircleIcon className={"size-6"} />}
              onClick={() =>
                trainingConstructorStore.moveExercise(exercise, "up")
              }
            >
              Выше
            </DropdownItem>
            <DropdownItem
              key="down-exercise"
              className="text-secondary"
              startContent={<ArrowDownCircleIcon className={"size-6"} />}
              onClick={() =>
                trainingConstructorStore.moveExercise(exercise, "down")
              }
            >
              Ниже
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
});
