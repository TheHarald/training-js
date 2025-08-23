import {
  ChartBarIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { navigationStore } from "../services/navigation-store";
import { AppRoutes } from "../services/types";
import { NavigationMenuButton } from "./navigation-menu-button";

const appRoutes = [
  {
    title: "Тренировки",
    key: AppRoutes.Training,
    icon: TrophyIcon,
  },
  {
    title: "Конструктор",
    key: AppRoutes.Constructor,
    icon: PencilSquareIcon,
  },
  {
    title: "Статистика",
    key: AppRoutes.Statistics,
    icon: ChartBarIcon,
  },
  {
    title: "Настройки",
    key: AppRoutes.Settings,
    icon: Cog6ToothIcon,
  },
];

export const NavigationMenu = observer(() => {
  const { tab, navigationDisabled } = navigationStore;

  return (
    <div className="w-full bg-default safe-bottom flex flex-row justify-between px-8">
      {appRoutes.map((route) => (
        <NavigationMenuButton
          key={route.key}
          disabled={navigationDisabled}
          icon={route.icon}
          onClick={() => navigationStore.setTab(route.key)}
          title={route.title}
          isActive={tab === route.key}
        />
      ))}
    </div>
  );
});
