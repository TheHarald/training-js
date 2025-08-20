import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { statisticsStore } from "../services/statistics-store";

export const StatisticsWeightRequestModal = observer(() => {
  const { weight, weightModalOpen } = statisticsStore;

  return (
    <Modal
      isOpen={weightModalOpen}
      size="xs"
      placement="center"
      onClose={() => statisticsStore.setOpen(false)}
    >
      <ModalContent>
        <ModalHeader>Какой ваш текущий вес?</ModalHeader>
        <ModalBody>
          <NumberInput
            size="lg"
            label={"Вес,кг"}
            step={0.1}
            minValue={0}
            value={weight}
            onValueChange={(value) => statisticsStore.setWeight(value)}
          />
        </ModalBody>
        <ModalFooter className="flex flex-row justify-between">
          <Button onPress={() => statisticsStore.setOpen(false)}>
            Пропустить
          </Button>
          <Button
            onPress={() => statisticsStore.confirmWeight()}
            color="primary"
          >
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
