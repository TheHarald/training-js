import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { trainingConstructorStore } from "../services/training-constructor-store";
import { exerciseDurations } from "../services/constants";
import { Counter } from "../../../components/counter";

export const TrainingConstructorExerciseModal = observer(() => {
  const { isEditing, editingExercise, canConfirmEditing } =
    trainingConstructorStore;

  const { name, duration, repeats, type } = editingExercise;

  const selected = duration ? [duration.toString()] : [];

  return (
    <Modal
      hideCloseButton
      onClose={() => trainingConstructorStore.cancelEditing()}
      isOpen={isEditing}
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Редактирование</ModalHeader>
        <ModalBody>
          {type === "rest" ? null : (
            <div className="flex flex-row gap-2">
              <Button
                onPress={() =>
                  trainingConstructorStore.setExerciseType("timed")
                }
                color={type === "timed" ? "primary" : "default"}
              >
                Время
              </Button>
              <Button
                onPress={() =>
                  trainingConstructorStore.setExerciseType("repeatable")
                }
                color={type === "repeatable" ? "primary" : "default"}
              >
                Количество
              </Button>
            </div>
          )}

          <Input
            onChange={(e) =>
              trainingConstructorStore.setExerciseName(e.target.value)
            }
            isDisabled={type === "rest"}
            label="Название упражнения"
            required
            placeholder="Введите название упражнения"
            value={name}
          />
          {type === "timed" || type === "rest" ? (
            <Select
              label="Длительность, сек"
              placeholder="Выберите длительность"
              selectedKeys={selected}
              onSelectionChange={([value]) => {
                trainingConstructorStore.setExerciseDuration(Number(value));
              }}
            >
              {exerciseDurations.map((duration) => (
                <SelectItem key={duration.toString()}>
                  {duration.toString()}
                </SelectItem>
              ))}
            </Select>
          ) : null}

          {type === "repeatable" ? (
            <Counter
              label="Повторения, раз"
              value={repeats}
              onChange={(value) =>
                trainingConstructorStore.setExerciseRepeats(value)
              }
            />
          ) : null}
        </ModalBody>
        <ModalFooter className="flex flex-row gap-2">
          <Button onPress={() => trainingConstructorStore.cancelEditing()}>
            Отмена
          </Button>
          <Button
            isDisabled={!canConfirmEditing}
            onPress={() => trainingConstructorStore.confirmEditing()}
            color="primary"
          >
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
