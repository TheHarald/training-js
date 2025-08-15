import { observer } from "mobx-react-lite";
import { NavigationMenu } from "./modules/navigation/components/navigation-menu";
import { TrainingConstructorModule } from "./modules/training-constructor";
import { navigationStore } from "./modules/navigation/services/navigation-store";
import { AppRoutes } from "./modules/navigation/services/types";
import { BuildInfo } from "./modules/settings/BuildInfo";

const App = observer(() => {
  const { tab } = navigationStore;

  return (
    <div className="h-full relative">
      <div className="m-4">
        {(() => {
          switch (tab) {
            case AppRoutes.Training: {
              return <div>Training</div>;
            }
            case AppRoutes.TrainingConstructor: {
              return <TrainingConstructorModule />;
            }
            case AppRoutes.Settings: {
              return <BuildInfo />;
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
