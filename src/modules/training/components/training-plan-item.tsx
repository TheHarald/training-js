import { observer } from "mobx-react-lite";
import type { TTrainingPlan } from "../../../types/types";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  PlayCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { averageOneExerciseTime } from "../../../constants";
import dayjs from "dayjs";
import { trainingStore } from "../services/training-store";

type TrainingPlanItemProps = {
  training: TTrainingPlan;
};

export const TrainingPlanItem = observer<TrainingPlanItemProps>((props) => {
  const { training } = props;

  const { name } = training;

  const duration = useMemo(() => {
    let time = 0;

    for (const exercise of training.exercises) {
      if (exercise.type === "repeatable") {
        time += exercise.repeats * averageOneExerciseTime;
      }

      if (exercise.type === "timed" || exercise.type === "rest") {
        time += exercise.duration;
      }
    }

    return dayjs.duration(time, "seconds").humanize();
  }, [training.exercises]);

  return (
    <Card>
      <CardBody className="flex flex-row items-center gap-2">
        <div className="flex flex-col gap-0 grow-1">
          <div className="text-l font font-medium">{name}</div>
          <div className="text-l font font-regular text-gray-400">{`~ ${duration}`}</div>
        </div>

        <div className="flex flex-row gap-1">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" isIconOnly color="secondary">
                <EllipsisVerticalIcon className="size-6" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dropdown menu with description"
              variant="faded"
            >
              <DropdownItem
                key="edit"
                startContent={<PencilIcon className={"size-6"} />}
                onClick={() => trainingStore.editTraining(training)}
              >
                Редактировать
              </DropdownItem>
              <DropdownItem
                key="delete"
                startContent={<TrashIcon className={"size-6 text-danger"} />}
                className="text-danger"
                onClick={() => trainingStore.deleteTraining(training.id)}
              >
                Удалить
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button variant="light" isIconOnly color="primary">
            <PlayCircleIcon className="size-6" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
});
