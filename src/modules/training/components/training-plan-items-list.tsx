import { observer } from "mobx-react-lite";
import { trainingStore } from "../services/training-store";
import { TrainingPlanItem } from "./training-plan-item";
import { Button, ScrollShadow } from "@heroui/react";
import { navigationStore } from "../../navigation/services/navigation-store";
import { AppRoutes } from "../../navigation/services/types";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const TrainingPlanItemsList = observer(() => {
  const { trainings } = trainingStore;

  return (
    <div className="flex flex-col gap-4 flex-1 overflow-hidden">
      <div className=" flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Тренировки</h2>
        <Button
          isIconOnly
          color="primary"
          variant="light"
          onPress={() => navigationStore.setTab(AppRoutes.Constructor)}
        >
          <PlusCircleIcon className="size-6" />
        </Button>
      </div>
      {(() => {
        if (trainings.length === 0) {
          return (
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 font-medium text-l text-center py-2">
                Похоже у вас еще нет тренировок
              </p>
              <Button
                onPress={() => navigationStore.setTab(AppRoutes.Constructor)}
                color="primary"
              >
                Создать
              </Button>
            </div>
          );
        }

        return (
          <ScrollShadow hideScrollBar>
            <div className="flex flex-col gap-4 min-h-full">
              {trainings.map((training) => (
                <TrainingPlanItem key={training.id} training={training} />
              ))}
            </div>
          </ScrollShadow>
        );
      })()}
    </div>
  );
});
