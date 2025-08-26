import { useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

interface TrainingCalendarProps {
  trainingDays: number[]; // Array of timestamps
  onAdd?: (date: Dayjs) => void;
  onDelete?: (date: Dayjs) => void;
}

interface CalendarDay {
  date: Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isTrainingDay: boolean;
}

const StatisticsTrainingCalendar = observer<TrainingCalendarProps>(
  ({ trainingDays, onAdd, onDelete }) => {
    console.log(trainingDays);
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

    const calendarDays = useMemo(() => {
      const startOfMonth = currentDate.startOf("month");
      const endOfMonth = currentDate.endOf("month");

      const startDate = startOfMonth.startOf("week");
      const endDate = endOfMonth.endOf("week");

      const days: CalendarDay[] = [];
      let currentDay = startDate;

      const trainingDayjsDates = trainingDays.map((day) => dayjs(day));

      while (currentDay.isSameOrBefore(endDate)) {
        days.push({
          date: currentDay,
          isCurrentMonth: currentDay.isSame(currentDate, "month"),
          isToday: currentDay.isSame(dayjs(), "day"),
          isTrainingDay: trainingDayjsDates.some((trainingDay) =>
            trainingDay.isSame(currentDay, "day")
          ),
        });
        currentDay = currentDay.add(1, "day");
      }

      return days;
    }, [currentDate, trainingDays.length]);

    const goToPreviousMonth = () => {
      setCurrentDate(currentDate.subtract(1, "month"));
    };

    const goToNextMonth = () => {
      setCurrentDate(currentDate.add(1, "month"));
    };

    return (
      <Card>
        {/* Header */}
        <CardHeader className="flex items-center justify-between mb-6">
          <Button
            isIconOnly
            variant="light"
            onPress={goToPreviousMonth}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ArrowLeftIcon className="size-6" />
          </Button>

          <h2 className="text-xl font-semibold text-center uppercase">
            {currentDate.format("MMMM YYYY")}
          </h2>

          <Button
            isIconOnly
            variant="light"
            onPress={goToNextMonth}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ArrowRightIcon className="size-6" />
          </Button>
        </CardHeader>

        {/* Week days header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <CardBody className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <Dropdown key={index}>
              <DropdownTrigger>
                <div
                  className={classNames(
                    "h-12 rounded-lg text-center transition-all duration-200",
                    {
                      "text-gray-600 ": !day.isCurrentMonth,
                      "ring-2 ring-blue-500 ": day.isToday,
                      "bg-gray-800": day.isCurrentMonth,
                      "bg-secondary": day.isTrainingDay,
                    }
                  )}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm">{day.date.date()}</span>
                    {day.isTrainingDay && (
                      <div className="w-1 h-1 bg-white rounded-full mt-1 " />
                    )}
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                disabledKeys={day.isTrainingDay ? [] : ["delete"]}
                variant="faded"
              >
                <DropdownItem
                  key="add"
                  startContent={<PlusCircleIcon className={"size-6 "} />}
                  className="text-primary"
                  onClick={() => onAdd?.(day.date)}
                >
                  Добавить
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  startContent={<TrashIcon className={"size-6"} />}
                  className="text-danger"
                  onClick={() => onDelete?.(day.date)}
                >
                  Удалить
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ))}
        </CardBody>

        {/* Legend */}
        <CardFooter className="flex justify-center mt-6 space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded"></div>
            <span>День тренировки</span>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

export default StatisticsTrainingCalendar;
