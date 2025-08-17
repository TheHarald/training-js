import { observer } from "mobx-react-lite";
import { trainingStore } from "../services/training-store";
import { Button } from "@heroui/react";
import { StopCircleIcon } from "@heroicons/react/24/outline";

export const TrainingScreen = observer(() => {
  const { playedTraining, currentExercise } = trainingStore;

  if (playedTraining === undefined) {
    return <div>Тренировка не выбрана</div>;
  }

  const { name } = playedTraining;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row  items-center justify-between">
        <div className="text-xl font-bold">{name}</div>
        <Button
          color="danger"
          isIconOnly
          onPress={() => trainingStore.stopTraining()}
        >
          <StopCircleIcon className="size-6" />
        </Button>
      </div>
      {/* TODO отображение упраднения */}
      <div>{currentExercise?.name}</div>
      <Button onPress={() => trainingStore.goToNextExercise()}>
        Завершить
      </Button>
      <Button>Пропустить</Button>
    </div>
  );
});
