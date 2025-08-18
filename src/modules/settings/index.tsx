import { Button } from "@heroui/react";
import { BuildInfo } from "./components/build-info";
import { TrainingSettingsEditor } from "./components/training-settings-editor";

export const SettingsModule = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Настройки</h1>
      <BuildInfo />
      <TrainingSettingsEditor />
      <Button color="danger" onPress={() => localStorage.clear()}>
        Очистить хранилище
      </Button>
    </div>
  );
};
