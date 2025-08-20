import { observer } from "mobx-react-lite";
import { StatisticsWeightRequestModal } from "./components/statistics-weight-request-modal";
import { useEffect } from "react";
import { statisticsStore } from "./services/statistics-store";

export const StatisticsModule = observer(() => {
  useEffect(() => {
    statisticsStore.tryRequestWeight();
  }, []);

  return <StatisticsWeightRequestModal />;
});
