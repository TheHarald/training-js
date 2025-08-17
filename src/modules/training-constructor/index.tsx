import { observer } from "mobx-react-lite";
import { TrainingConstructorExerciseList } from "./components/training-constructor-exercise-list";
import { TrainingConstructorExerciseModal } from "./components/training-constructor-exercise-modal";

export const TrainingConstructorModule = observer(() => {
  return (
    <>
      <TrainingConstructorExerciseList />
      <TrainingConstructorExerciseModal />
    </>
  );
});
