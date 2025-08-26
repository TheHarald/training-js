import { observer } from "mobx-react-lite";
import { statisticsStore } from "./services/statistics-store";
import { StatisticsWeightGraphic } from "./components/statistics-weight-graphic";
import { Button, ScrollShadow } from "@heroui/react";
import StatisticsTrainingCalendar from "./components/statistics-training-calendar";
import { toJS } from "mobx";

export const StatisticsModule = observer(() => {
  const { weights, trainingDays } = statisticsStore;

  console.log(toJS(trainingDays));

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h1 className="text-2xl font-bold">Статистика</h1>
      <ScrollShadow hideScrollBar>
        <div className="flex flex-col gap-4 min-h-full">
          <StatisticsWeightGraphic weights={weights} />
          <Button onPress={() => statisticsStore.setOpen(true)} color="primary">
            Заполнить показания веса
          </Button>
          <StatisticsTrainingCalendar
            onAdd={(date) => statisticsStore.addTrainingDate(date.valueOf())}
            onDelete={(date) =>
              statisticsStore.deleteTrainingDate(date.valueOf())
            }
            trainingDays={trainingDays}
          />
        </div>
      </ScrollShadow>
    </div>
  );
});
