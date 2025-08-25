import { observer } from "mobx-react-lite";
import { trainingStore } from "../services/training-store";
import { Button, Progress } from "@heroui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { TrainingExerciseCard } from "./training-exercise-card";
import { TrainingExerciseNext } from "./training-exercise-next";

export const TrainingScreen = observer(() => {
  const { playedTraining, currentExercise, progress, nextExercise } =
    trainingStore;

  if (playedTraining === undefined) {
    return <div>Тренировка не выбрана</div>;
  }

  const { name, exercises } = playedTraining;

  return (
    <div className="flex flex-col gap-4 justify-between">
      <div className="flex flex-row  items-center justify-between min-h-0">
        <div className="text-xl font-bold">{name}</div>
        <Button
          color="danger"
          variant="light"
          isIconOnly
          onPress={() => trainingStore.stopTraining()}
        >
          <XCircleIcon className="size-6" />
        </Button>
      </div>
      <Progress
        label={`${progress} / ${exercises.length}`}
        className="font-medium"
        color="primary"
        size="md"
        maxValue={exercises.length}
        value={progress}
      />

      {(() => {
        if (currentExercise) {
          return (
            <>
              <TrainingExerciseCard exercise={currentExercise} />
              {nextExercise ? (
                <TrainingExerciseNext exercise={nextExercise} />
              ) : null}
              <Button
                color="primary"
                onPress={() => trainingStore.goToNextExercise()}
                isDisabled={nextExercise === undefined}
              >
                Далее
              </Button>
              {nextExercise === undefined ? (
                <Button
                  color="success"
                  onPress={() => trainingStore.finishTraining()}
                >
                  Завершить тренировку
                </Button>
              ) : null}
            </>
          );
        }

        return (
          <Button color="primary" onPress={() => trainingStore.startTraining()}>
            Начать
          </Button>
        );
      })()}
    </div>
  );
});
