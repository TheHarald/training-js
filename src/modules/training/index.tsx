import { observer } from "mobx-react-lite";
import { trainingStore } from "./services/training-store";
import { useEffect } from "react";
import { TrainingPlanItem } from "./components/training-plan-item";

export const TrainingModule = observer(() => {
  const { trainings } = trainingStore;

  useEffect(() => {
    trainingStore.getTrainings();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Тренировки</h2>
      {trainings.map((training) => (
        <TrainingPlanItem key={training.id} training={training} />
      ))}
    </div>
  );
});
