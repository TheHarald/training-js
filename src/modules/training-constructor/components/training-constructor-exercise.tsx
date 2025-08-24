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
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { trainingConstructorStore } from "../services/training-constructor-store";
import { useMemo } from "react";

type TProps = {
  exercise: TTrainingExercise;
};

export const TrainingConstructorExercise = observer<TProps>((props) => {
  const { exercise } = props;

  const { name, repeats, duration, type, id } = exercise;

  const title = useMemo(() => {
    if (type === "repeatable") {
      return `${name}, ${repeats} повторений`;
    }

    if (type === "timed") {
      return `${name}, ${duration} секунд`;
    }

    return name;
  }, [duration, name, repeats, type]);

  return (
    <Card>
      <CardBody className="flex flex-row gap-2 py-1 justify-between">
        <div className="flex flex-row gap-2 text-l font-medium items-center">
          {title}
        </div>

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
              key="duplicate-exercise"
              className="text-secondary"
              startContent={<DocumentDuplicateIcon className={"size-6"} />}
              onClick={() =>
                trainingConstructorStore.duplicateExercise(exercise)
              }
            >
              Дублировать
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
            <DropdownItem
              key="delete-exercise"
              className="text-danger"
              startContent={<TrashIcon className={"size-6"} />}
              onClick={() => trainingConstructorStore.deleteExercise(id)}
            >
              Удалить
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
});
