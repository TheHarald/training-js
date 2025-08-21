import { observer } from "mobx-react-lite";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import dayjs from "dayjs";
import type { TStatisticWeightData } from "../services/statistic-types";

interface ChartPoint {
  x: number;
  y: number;
  weight: number;
  date: number;
  formattedDate: string;
}

type TProps = {
  weights: TStatisticWeightData[];
};

export const StatisticsWeightGraphic = observer<TProps>((props) => {
  const { weights } = props;

  const chartData = useMemo(() => {
    if (weights.length === 0)
      return {
        points: [],
        minWeight: 0,
        maxWeight: 0,
        pathD: "",
        chartHeight: 0,
        chartWidth: 0,
      };

    const sortedWeights = [...weights].sort((a, b) => a.date - b.date);
    const minWeight = Math.min(...sortedWeights.map((w) => w.weight));
    const maxWeight = Math.max(...sortedWeights.map((w) => w.weight));
    const weightRange = maxWeight - minWeight || 1;

    const chartWidth = 400;
    const chartHeight = 200;
    const padding = 20;

    const points: ChartPoint[] = sortedWeights.map((weight, index) => {
      const x =
        padding +
        (index / Math.max(sortedWeights.length - 1, 1)) *
          (chartWidth - 2 * padding);
      const y =
        chartHeight -
        padding -
        ((weight.weight - minWeight) / weightRange) *
          (chartHeight - 2 * padding);

      return {
        x,
        y,
        weight: weight.weight,
        date: weight.date,
        formattedDate: dayjs(weight.date).format("MMM DD"),
      };
    });

    const pathD = points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      const prevPoint = points[index - 1];
      const controlX1 = prevPoint.x + (point.x - prevPoint.x) * 0.3;
      const controlY1 = prevPoint.y;
      const controlX2 = point.x - (point.x - prevPoint.x) * 0.3;
      const controlY2 = point.y;
      return `${path} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${point.x} ${point.y}`;
    }, "");

    return { points, minWeight, maxWeight, pathD, chartWidth, chartHeight };
  }, [weights]);

  if (weights.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Нет данных</h3>
        <p className="text-center">Начните заполнять данные о весе</p>
      </motion.div>
    );
  }

  const { points, minWeight, maxWeight, pathD, chartWidth, chartHeight } =
    chartData;
  const latestWeight = weights[weights.length - 1];
  const previousWeight =
    weights.length > 1 ? weights[weights.length - 2] : null;
  const weightChange = previousWeight
    ? latestWeight.weight - previousWeight.weight
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-content1 rounded-2xl shadow-xl p-6 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Динамика веса</h2>
          <p className="">{weights.length} измерений</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold ">{latestWeight.weight} кг</div>
          {previousWeight && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center justify-end text-sm ${
                weightChange > 0
                  ? "text-red-500"
                  : weightChange < 0
                  ? "text-green-500"
                  : ""
              }`}
            >
              {weightChange > 0 ? "↗" : weightChange < 0 ? "↘" : "→"}
              <span className="ml-1">
                {weightChange > 0 ? "+" : ""}
                {weightChange.toFixed(1)} кг
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg
          width={chartWidth}
          height={chartHeight}
          className="w-full h-auto"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        >
          {/* Grid lines */}
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>

          {/* Bacкгround grid */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`grid-${i}`}
              x1={20}
              y1={20 + (i * (chartHeight - 40)) / 4}
              x2={chartWidth - 20}
              y2={20 + (i * (chartHeight - 40)) / 4}
              stroke="#E5E7EB"
              strokeWidth={1}
              strokeDasharray={3}
            />
          ))}

          {/* Area under curve */}
          {pathD && (
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d={`${pathD} L ${points[points.length - 1].x} ${
                chartHeight - 20
              } L ${points[0].x} ${chartHeight - 20} Z`}
              fill="url(#chartGradient)"
            />
          )}

          {/* Main line */}
          {pathD && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d={pathD}
              fill="none"
              className="stroke-primary"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data points */}
          <AnimatePresence>
            {points.map((point, index) => (
              <motion.g
                className={"cursor-pointer"}
                key={`point-${point.date}`}
              >
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                  cx={point.x}
                  cy={point.y}
                  r={6}
                  strokeWidth={2}
                  className="fill-primary"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.2 }}
                  cx={point.x}
                  cy={point.y}
                  r={3}
                  className={"fill-white"}
                />
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>

        {/* Weight labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-5 text-xs ">
          <span>{maxWeight.toFixed(1)} кг</span>
          <span>{((maxWeight + minWeight) / 2).toFixed(1)} кг</span>
          <span>{minWeight.toFixed(1)} кг</span>
        </div>
      </div>

      {/* Date labels */}
      <div className="flex justify-between mt-4 px-5 text-xs ">
        {points.length > 0 && (
          <>
            <span>{points[0].formattedDate}</span>
            {points.length > 2 && (
              <span>{points[Math.floor(points.length / 2)].formattedDate}</span>
            )}
            <span>{points[points.length - 1].formattedDate}</span>
          </>
        )}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t"
      >
        <div className="text-center">
          <div className="text-lg font-semibold ">{minWeight.toFixed(1)}</div>
          <div className="text-xs ">Минимум</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold ">{maxWeight.toFixed(1)}</div>
          <div className="text-xs ">Максимум</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold ">
            {(
              weights.reduce((sum, w) => sum + w.weight, 0) / weights.length
            ).toFixed(1)}
          </div>
          <div className="text-xs ">Средний вес</div>
        </div>
      </motion.div>
    </motion.div>
  );
});
