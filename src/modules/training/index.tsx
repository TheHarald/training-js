import { Button } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { trainingStore } from "./training-store";

export const TrainingModule = observer(() => {
  const { counter } = trainingStore;
  return (
    <div>
      <h1>Training Module</h1>
      <Button color="primary" onPress={() => trainingStore.increment(1)}>
        {counter}
      </Button>
    </div>
  );
});
