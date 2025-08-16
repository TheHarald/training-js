import {
  Cog6ToothIcon,
  HeartIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Button, ButtonGroup } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { navigationStore } from "../services/navigation-store";
import { AppRoutes } from "../services/types";
import classNames from "classnames";

export const NavigationMenu = observer(() => {
  const { tab } = navigationStore;

  return (
    <div
      style={{ paddingBottom: 38 }}
      className="w-full bg-default bottom-0 fixed z-100500"
    >
      <ButtonGroup className="w-full">
        <Button
          variant="light"
          fullWidth
          radius="none"
          onPress={() => navigationStore.setTab(AppRoutes.Training)}
        >
          <HeartIcon
            className={classNames("size-6", {
              "text-primary": tab === AppRoutes.Training,
            })}
          />
        </Button>
        <Button
          variant="light"
          onPress={() => navigationStore.setTab(AppRoutes.TrainingConstructor)}
          fullWidth
          radius="none"
        >
          <WrenchScrewdriverIcon
            className={classNames("size-6", {
              "text-primary": tab === AppRoutes.TrainingConstructor,
            })}
          />
        </Button>
        <Button
          variant="light"
          onPress={() => navigationStore.setTab(AppRoutes.Settings)}
          fullWidth
          radius="none"
        >
          <Cog6ToothIcon
            className={classNames("size-6", {
              "text-primary": tab === AppRoutes.Settings,
            })}
          />
        </Button>
      </ButtonGroup>
    </div>
  );
});
