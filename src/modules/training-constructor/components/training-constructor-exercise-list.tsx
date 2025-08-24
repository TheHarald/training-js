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
  NumberInput,
  ScrollShadow,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { durations } from "../services/constants";

export const TrainingConstructorExerciseList = observer(() => {
  const { canCreateTraining, trainingPlan } = trainingConstructorStore;
  const { exercises, name, restDuration, circlesCount } = trainingPlan;

  const selected = restDuration ? [restDuration.toString()] : [];

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

      <div className="flex flex-row gap-2">
        <Select
          label="Длительность отдыха, сек"
          placeholder="Выберите длительность"
          selectedKeys={selected}
          onSelectionChange={([value]) => {
            trainingConstructorStore.setRestDuration(Number(value));
          }}
        >
          {durations.map((duration) => (
            <SelectItem key={duration.toString()}>
              {duration.toString()}
            </SelectItem>
          ))}
        </Select>

        <NumberInput
          minValue={1}
          label={"Круги"}
          value={circlesCount}
          onValueChange={(value) =>
            trainingConstructorStore.setCirclesCount(value)
          }
        />
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
            <p className="text-gray-500 font-medium text-l text-center py-2">
              Упражнений пока нет
            </p>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
});
