import { Button } from "@heroui/react";
import { BuildInfo } from "./components/build-info";
import { TrainingSettingsEditor } from "./components/training-settings-editor";
import { ConfirmationWrapper } from "../../components/confirmation-wrapper";
import { trainingStorageHelper } from "../../helpers/training-storage-helper";

export const SettingsModule = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Настройки</h1>
      <BuildInfo />
      <TrainingSettingsEditor />

      <ConfirmationWrapper
        color="danger"
        onConfirm={() => localStorage.clear()}
        title="Очистка данных"
        message="Вы уверены, что хотите очистить все данные? Это действие нельзя отменить."
        confirmText="Очистить"
        cancelText="Отменить"
      >
        <Button color="danger">Очистить хранилище</Button>
      </ConfirmationWrapper>

      <ConfirmationWrapper
        color="danger"
        onConfirm={() => trainingStorageHelper.remove()}
        title="Очистка списка тренировок"
        message="Вы уверены, что хотите очистить все тренировки? Это действие нельзя отменить."
        confirmText="Очистить"
        cancelText="Отменить"
      >
        <Button color="danger">Очистить список тренировок</Button>
      </ConfirmationWrapper>
    </div>
  );
};
