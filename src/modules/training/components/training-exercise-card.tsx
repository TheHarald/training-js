import { observer } from "mobx-react-lite";
import { Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";
import { trainingSettingsStore } from "../../settings/services/training-settings-store";
import { trainingStore } from "../services/training-store";
import { TExerciseType, type TExercise } from "../../../types/types";

type TProps = {
  exercise: TExercise;
};

export const TrainingExerciseCard = observer<TProps>((props) => {
  const { exercise } = props;
  const { name, type } = exercise;
  const { autoRunExercises } = trainingSettingsStore.settings;

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (type === TExerciseType.Quantitative) return;

    setTimeLeft(exercise.duration); // Сброс времени при изменении упражнения

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);

          if (autoRunExercises) {
            trainingStore.goToNextExercise();
          }

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRunExercises, exercise, type]); // Зависимость от duration, чтобы перезапускать при смене упражнения

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        <div className="font-bold text-3xl">{name}</div>

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
              <div className="flex items-center justify-between">
                <div className="text-2xl font-mono">{formatTime(timeLeft)}</div>
              </div>
            );
          }
        })()}
      </CardBody>
    </Card>
  );
});
