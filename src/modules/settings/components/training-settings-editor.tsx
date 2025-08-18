import { Card, CardBody, Switch } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { trainingSettingsStore } from "../services/training-settings-store";

export const TrainingSettingsEditor = observer(() => {
  const { settings } = trainingSettingsStore;

  const { autoRunExercises } = settings;

  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        <Switch
          isSelected={autoRunExercises}
          onValueChange={(value) =>
            trainingSettingsStore.updateSettings({
              autoRunExercises: value,
            })
          }
        >
          Автоматически запускать упражнения
        </Switch>
      </CardBody>
    </Card>
  );
});
