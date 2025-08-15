import { observer } from "mobx-react-lite";
import { TrainingConstructorExerciseList } from "./components/training-constructor-exercise-list";
import { TrainingConstructorExerciseModal } from "./components/training-constructor-exercise-modal";

export const TrainingConstructorModule = observer(() => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Конструктор тренировок</h1>
      <TrainingConstructorExerciseList />
      <TrainingConstructorExerciseModal />
    </div>
  );
});
