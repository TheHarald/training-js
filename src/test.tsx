import { observer } from "mobx-react-lite";
import { trainingConstructorStore } from "./modules/training-constructor/services/training-constructor-store";
import { Button, ScrollShadow } from "@heroui/react";
import { TrainingConstructorExercise } from "./modules/training-constructor/components/training-constructor-exercise";
import { PauseCircleIcon } from "@heroicons/react/16/solid";

export const Test = observer(() => {
  const { trainingPlan } = trainingConstructorStore;
  const { exercises } = trainingPlan;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Шапка (фиксированная) */}
      <header className="p-4 bg-purple-700 text-white text-xl font-bold shrink-0">
        Заголовок
        <Button
          isIconOnly
          color="secondary"
          onPress={() => trainingConstructorStore.addRestExercise()}
        >
          <PauseCircleIcon className="size-6" />
        </Button>
      </header>

      <ScrollShadow className="flex-1 overflow-y-auto py-4" hideScrollBar>
        <div className="flex flex-col gap-2 min-h-full">
          {exercises.map((exercise) => (
            <TrainingConstructorExercise
              key={exercise.id}
              exercise={exercise}
            />
          ))}
        </div>
      </ScrollShadow>

      {/* Тап-бар (фиксированный снизу) */}
      <footer className="flex justify-around py-2 bg-slate-950 border-t border-gray-300 shrink-0">
        <button className="px-4 py-2 text-sm bg-transparent">Кнопка 1</button>
        <button className="px-4 py-2 text-sm bg-transparent">Кнопка 2</button>
        <button className="px-4 py-2 text-sm bg-transparent">Кнопка 3</button>
      </footer>
    </div>
  );
});
