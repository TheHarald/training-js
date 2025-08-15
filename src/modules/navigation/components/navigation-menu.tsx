import {
  Cog6ToothIcon,
  HeartIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Button, ButtonGroup } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { navigationStore } from "../services/navigation-store";
import { AppRoutes } from "../services/types";

export const NavigationMenu = observer(() => {
  const { tab } = navigationStore;

  return (
    <ButtonGroup className="w-full fixed bottom-6">
      <Button
        color={tab === AppRoutes.Training ? "primary" : "default"}
        fullWidth
        radius="none"
        onPress={() => navigationStore.setTab(AppRoutes.Training)}
      >
        <HeartIcon className="size-6" />
      </Button>
      <Button
        color={tab === AppRoutes.TrainingConstructor ? "primary" : "default"}
        onPress={() => navigationStore.setTab(AppRoutes.TrainingConstructor)}
        fullWidth
        radius="none"
      >
        <WrenchScrewdriverIcon className="size-6" />
      </Button>
      <Button
        color={tab === AppRoutes.Settings ? "primary" : "default"}
        onPress={() => navigationStore.setTab(AppRoutes.Settings)}
        fullWidth
        radius="none"
      >
        <Cog6ToothIcon className="size-6" />
      </Button>
    </ButtonGroup>
  );
});
