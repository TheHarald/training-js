import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { statisticsStore } from "./services/statistics-store";
import { StatisticsWeightGraphic } from "./components/statistics-weight-graphic";

export const StatisticsModule = observer(() => {
  useEffect(() => {
    statisticsStore.tryRequestWeight();
  }, []);

  const { weights } = statisticsStore;

  return (
    <>
      <StatisticsWeightGraphic weights={weights} />
    </>
  );
});
