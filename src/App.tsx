import { observer } from "mobx-react-lite";
import { NavigationMenu } from "./modules/navigation/components/navigation-menu";
import { TrainingConstructorModule } from "./modules/training-constructor";
import { navigationStore } from "./modules/navigation/services/navigation-store";
import { AppRoutes } from "./modules/navigation/services/types";
import { SettingsModule } from "./modules/settings";
import { TrainingModule } from "./modules/training";
import { StatisticsModule } from "./modules/statistics";
import { StatisticsWeightRequestModal } from "./modules/statistics/components/statistics-weight-request-modal";

const App = observer(() => {
  const { tab } = navigationStore;

  return (
    <div className="flex flex-col h-dvh w-screen overflow-hidden">
      <div className="flex flex-col gap-2 px-2 py-4 overflow-hidden flex-1 min-h-0">
        {(() => {
          switch (tab) {
            case AppRoutes.Constructor: {
              return <TrainingConstructorModule />;
            }
            case AppRoutes.Training: {
              return <TrainingModule />;
            }
            case AppRoutes.Settings: {
              return <SettingsModule />;
            }
            case AppRoutes.Statistics: {
              return <StatisticsModule />;
            }
            default:
              return <div>404</div>;
          }
        })()}
      </div>
      <StatisticsWeightRequestModal />
      <NavigationMenu />
    </div>
  );
});

export default App;
