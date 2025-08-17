import { observer } from "mobx-react-lite";
import { trainingStore } from "../services/training-store";
import { TrainingPlanItem } from "./training-plan-item";

export const TrainingPlanItemsList = observer(() => {
  const { trainings } = trainingStore;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Тренировки</h2>
      {trainings.map((training) => (
        <TrainingPlanItem key={training.id} training={training} />
      ))}
    </div>
  );
});
