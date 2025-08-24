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
import { durations } from "../services/constants";
import { Counter } from "../../../components/counter";
import { TExerciseType } from "../../../types/types";

export const TrainingConstructorExerciseModal = observer(() => {
  const { isEditing, editingExercise, canConfirmEditing } =
    trainingConstructorStore;

  const { name, type } = editingExercise;

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
          <div className="flex flex-row gap-2">
            <Button
              color={type === TExerciseType.Timed ? "primary" : "default"}
            >
              Время
            </Button>
            <Button
              color={
                type === TExerciseType.Quantitative ? "primary" : "default"
              }
            >
              Количество
            </Button>
          </div>

          <Input
            onChange={(e) =>
              trainingConstructorStore.setExerciseName(e.target.value)
            }
            label="Название упражнения"
            required
            placeholder="Введите название упражнения"
            value={name}
          />

          {(() => {
            if (type === TExerciseType.Quantitative) {
              return (
                <Counter
                  label="Повторения, раз"
                  value={editingExercise.repeats}
                  onChange={(value) =>
                    trainingConstructorStore.setExerciseRepeats(value)
                  }
                />
              );
            }

            if (type === TExerciseType.Timed) {
              const selected = editingExercise.duration
                ? [editingExercise.duration.toString()]
                : [];

              return (
                <Select
                  label="Длительность, сек"
                  placeholder="Выберите длительность"
                  selectedKeys={selected}
                  onSelectionChange={([value]) => {
                    trainingConstructorStore.setExerciseDuration(Number(value));
                  }}
                >
                  {durations.map((duration) => (
                    <SelectItem key={duration.toString()}>
                      {duration.toString()}
                    </SelectItem>
                  ))}
                </Select>
              );
            }

            return null;
          })()}
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
