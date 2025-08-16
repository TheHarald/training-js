import { observer } from "mobx-react-lite";
import { trainingStore } from "./services/training-store";
import { useEffect } from "react";

export const TrainingModule = observer(() => {
  const { trainings } = trainingStore;

  useEffect(() => {
    trainingStore.getTrainings();
  }, []);

  console.log("test");

  return (
    <div className="flex flex-col gap-2">
      {trainings.map((training) => (
        <div>{training.name}</div>
      ))}
    </div>
  );
});
