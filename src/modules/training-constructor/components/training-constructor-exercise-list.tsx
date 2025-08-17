import { observer } from "mobx-react-lite";
import { TrainingConstructorExercise } from "./training-constructor-exercise";
import { trainingConstructorStore } from "../services/training-constructor-store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  ScrollShadow,
} from "@heroui/react";
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export const TrainingConstructorExerciseList = observer(() => {
  const { canCreateTraining, trainingPlan } = trainingConstructorStore;
  const { exercises, name } = trainingPlan;
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <div className="flex flex-row gap-2">
        <Input
          onChange={(e) =>
            trainingConstructorStore.setTrainingName(e.target.value)
          }
          value={name}
          placeholder="Введите название тренировки"
        />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" isIconOnly color="secondary">
              <EllipsisVerticalIcon className="size-6" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded">
            <DropdownItem
              key="add-exercise"
              className="text-primary"
              startContent={<PlusCircleIcon className={"size-6"} />}
              onClick={() => trainingConstructorStore.addExercise()}
            >
              Добавить упражнение
            </DropdownItem>
            <DropdownItem
              key="add-rest"
              className="text-secondary"
              startContent={<PlusCircleIcon className={"size-6"} />}
              onClick={() => trainingConstructorStore.addRestExercise()}
            >
              Добавить отдых
            </DropdownItem>
            <DropdownItem
              key="clear"
              className="text-danger"
              startContent={<TrashIcon className={"size-6"} />}
              onClick={() => trainingConstructorStore.resetConstructor()}
            >
              Очистить конструктор
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button
          isDisabled={!canCreateTraining}
          isIconOnly
          variant="light"
          color="success"
          onPress={() => trainingConstructorStore.addTrainingPlan()}
        >
          <CheckCircleIcon className="size-6" />
        </Button>
      </div>
      <ScrollShadow hideScrollBar>
        <div className="flex flex-col gap-2 min-h-full">
          {exercises.length ? (
            exercises.map((exercise) => (
              <TrainingConstructorExercise
                key={exercise.id}
                exercise={exercise}
              />
            ))
          ) : (
            <div className="text-center self-center">Упражнений пока нет</div>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
});
