import { observer } from "mobx-react-lite";
import { NavigationMenu } from "./modules/navigation/components/navigation-menu";
import { TrainingConstructorModule } from "./modules/training-constructor";
import { navigationStore } from "./modules/navigation/services/navigation-store";
import { AppRoutes } from "./modules/navigation/services/types";
import { SettingsModule } from "./modules/settings";
import { TrainingModule } from "./modules/training";

const App = observer(() => {
  const { tab } = navigationStore;

  return (
    <div className="flex flex-col relative">
      <div className="m-2 flex flex-col">
        {(() => {
          switch (tab) {
            case AppRoutes.Training: {
              return <TrainingModule />;
            }
            case AppRoutes.TrainingConstructor: {
              return <TrainingConstructorModule />;
            }
            case AppRoutes.Settings: {
              return <SettingsModule />;
            }
            default:
              return <div>404</div>;
          }
        })()}
      </div>
      <NavigationMenu />
    </div>
  );
});

export default App;
