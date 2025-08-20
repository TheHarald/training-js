import { Card, CardBody, Switch } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { trainingSettingsStore } from "../services/training-settings-store";

export const TrainingSettingsEditor = observer(() => {
  const { settings } = trainingSettingsStore;

  const { autoRunExercises, isRequestWeight } = settings;

  return (
    <Card>
      <CardBody className="flex flex-col gap-4">
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
        <Switch
          isSelected={isRequestWeight}
          onValueChange={(value) =>
            trainingSettingsStore.updateSettings({
              isRequestWeight: value,
            })
          }
        >
          Запрашивать вес
        </Switch>
      </CardBody>
    </Card>
  );
});
