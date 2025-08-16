import { observer } from "mobx-react-lite";
import type { TTrainingPlan } from "../../../types/types";
import { Button, Card, CardBody } from "@heroui/react";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { averageOneExerciseTime } from "../../../constants";
import dayjs from "dayjs";

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
      <CardBody className="flex flex-row items-center gap-4">
        <div className="text-xl font font-medium grow-1">{name}</div>
        <div className="text-l font font-regular text-gray-400">{`~ ${duration}`}</div>
        <Button isDisabled isIconOnly color="primary">
          <PlayCircleIcon className="size-6" />
        </Button>
      </CardBody>
    </Card>
  );
});
