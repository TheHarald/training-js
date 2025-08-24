import { observer } from "mobx-react-lite";
import type { TTrainingExercise } from "../../../types/types";
import { Card, CardBody, CardHeader } from "@heroui/react";

type TProps = {
  exercise: TTrainingExercise;
};

export const TrainingExerciseNext = observer<TProps>((props) => {
  const { exercise } = props;
  const { name, repeats, type, duration } = exercise;

  const hasDuration = type === "timed";

  return (
    <Card className="opacity-75 border-dashed border-2 border-primary">
      <CardHeader className="font-medium text-l">
        Следующее упражнение
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <div className="font-bold text-lg">{name}</div>

        {type === "repeatable" && (
          <div className="font-medium text-gray-600">Повторений: {repeats}</div>
        )}
        {hasDuration && (
          <div className="font-medium text-gray-600">
            Длительность, сек: {duration}
          </div>
        )}
      </CardBody>
    </Card>
  );
});
