import { observer } from "mobx-react-lite";
import { statisticsStore } from "./services/statistics-store";
import { StatisticsWeightGraphic } from "./components/statistics-weight-graphic";
import { Button, ScrollShadow } from "@heroui/react";

export const StatisticsModule = observer(() => {
  const { weights } = statisticsStore;

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <ScrollShadow hideScrollBar>
        <div className="flex flex-col gap-4 min-h-full">
          <StatisticsWeightGraphic weights={weights} />
          <Button onPress={() => statisticsStore.setOpen(true)} color="primary">
            Заполнить показания веса
          </Button>
        </div>
      </ScrollShadow>
    </div>
  );
});
