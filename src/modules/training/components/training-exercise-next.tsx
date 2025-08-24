import { observer } from "mobx-react-lite";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { TExerciseType, type TExercise } from "../../../types/types";

type TProps = {
  exercise: TExercise;
};

export const TrainingExerciseNext = observer<TProps>((props) => {
  const { exercise } = props;
  const { name, type } = exercise;

  return (
    <Card className="opacity-75 border-dashed border-2 border-primary">
      <CardHeader className="font-medium text-l">
        Следующее упражнение
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <div className="font-bold text-lg">{name}</div>

        {(() => {
          if (type === TExerciseType.Quantitative) {
            return (
              <div className="font-medium text-gray-600">
                Повторений: {exercise.repeats}
              </div>
            );
          }

          if (type === TExerciseType.Timed || type === TExerciseType.Rest) {
            return (
              <div className="font-medium text-gray-600">
                Длительность, сек: {exercise.duration}
              </div>
            );
          }
        })()}
      </CardBody>
    </Card>
  );
});
