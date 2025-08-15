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

  const { name, duration, repeats } = editingExercise;

  const selected = duration ? [duration.toString()] : [];

  return (
    <Modal
      hideCloseButton
      onClose={() => trainingConstructorStore.cancelEditing()}
      isOpen={isEditing}
      placement="top"
    >
      <ModalContent>
        <ModalHeader>Редактирование</ModalHeader>
        <ModalBody>
          <Input
            onChange={(e) =>
              trainingConstructorStore.setExerciseName(e.target.value)
            }
            label="Название упражнения"
            required
            placeholder="Введите название упражнения"
            value={name}
          />
          <Select
            label="Длительность упражнения, сек"
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
          <Counter
            label="Повторения"
            value={repeats}
            onChange={(value) =>
              trainingConstructorStore.setExerciseRepeats(value)
            }
          />
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
