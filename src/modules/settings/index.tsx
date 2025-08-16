import { Button } from "@heroui/react";
import { BuildInfo } from "./components/build-info";

export const SettingsModule = () => {
  return (
    <div className="flex flex-col gap-2">
      <BuildInfo />
      <Button onPress={() => localStorage.clear()}>Очистить хранилище</Button>
    </div>
  );
};
