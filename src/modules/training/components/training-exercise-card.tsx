import { observer } from "mobx-react-lite";
import type { TTrainingExercise } from "../../../types/types";
import { Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";
import { trainingSettingsStore } from "../../settings/services/training-settings-store";
import { trainingStore } from "../services/training-store";

type TProps = {
  exercise: TTrainingExercise;
};

export const TrainingExerciseCard = observer<TProps>((props) => {
  const { exercise } = props;
  const { name, duration, repeats, type } = exercise;
  const { autoRunExercises } = trainingSettingsStore.settings;

  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // Сброс времени при изменении упражнения

    if (type === "repeatable") return;

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
  }, [exercise]); // Зависимость от duration, чтобы перезапускать при смене упражнения

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const showTimer = type === "timed" || type === "rest";

  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        <div className="font-bold text-3xl">{name}</div>

        {showTimer && (
          <div className="flex items-center justify-between">
            <div className="text-2xl font-mono">{formatTime(timeLeft)}</div>
          </div>
        )}

        {type === "repeatable" && (
          <div className="font-medium text-gray-600">Повторений: {repeats}</div>
        )}
      </CardBody>
    </Card>
  );
});
