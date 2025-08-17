import { observer } from "mobx-react-lite";
import { trainingStore } from "./services/training-store";
import { useEffect } from "react";
import { TrainingPlanItemsList } from "./components/training-plan-items-list";
import { TrainingScreen } from "./components/training-screen";

export const TrainingModule = observer(() => {
  const { playedTraining } = trainingStore;

  useEffect(() => {
    trainingStore.getTrainings();
  }, []);

  return (
    <div className="">
      {playedTraining === undefined ? (
        <TrainingPlanItemsList />
      ) : (
        <TrainingScreen />
      )}
    </div>
  );
});
