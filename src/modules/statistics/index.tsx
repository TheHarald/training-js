import { observer } from "mobx-react-lite";
import { statisticsStore } from "./services/statistics-store";
import { StatisticsWeightGraphic } from "./components/statistics-weight-graphic";
import { Button } from "@heroui/react";

export const StatisticsModule = observer(() => {
  const { weights } = statisticsStore;

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <StatisticsWeightGraphic weights={weights} />
      <Button onPress={() => statisticsStore.setOpen(true)} color="primary">
        Заполнить показания веса
      </Button>
    </div>
  );
});
