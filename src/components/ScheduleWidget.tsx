import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { useAnimation } from '../hooks/useAnimation';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const ScheduleWidget = () => {
  const { schedule } = useStore();
  const { shouldAnimate, getTransition } = useAnimation();
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [currentPeriod, setCurrentPeriod] = useState(0);

  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const periods = Array.from({ length: 12 }, (_, i) => i + 1);

  const todaySchedule = schedule.filter((item) => item.day === currentDay);
  const currentSchedule = todaySchedule.find((item) => item.period === currentPeriod);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes >= 480 && totalMinutes < 530) setCurrentPeriod(1);
    else if (totalMinutes >= 540 && totalMinutes < 590) setCurrentPeriod(2);
    else if (totalMinutes >= 600 && totalMinutes < 650) setCurrentPeriod(3);
    else if (totalMinutes >= 660 && totalMinutes < 710) setCurrentPeriod(4);
    else if (totalMinutes >= 720 && totalMinutes < 770) setCurrentPeriod(5);
    else if (totalMinutes >= 780 && totalMinutes < 830) setCurrentPeriod(6);
    else if (totalMinutes >= 840 && totalMinutes < 890) setCurrentPeriod(7);
    else if (totalMinutes >= 900 && totalMinutes < 950) setCurrentPeriod(8);
    else if (totalMinutes >= 960 && totalMinutes < 1010) setCurrentPeriod(9);
    else if (totalMinutes >= 1020 && totalMinutes < 1070) setCurrentPeriod(10);
    else if (totalMinutes >= 1080 && totalMinutes < 1130) setCurrentPeriod(11);
    else if (totalMinutes >= 1140 && totalMinutes < 1190) setCurrentPeriod(12);
  }, []);

  const isInteractive = shouldAnimate('interaction');

  return (
    <div className="w-full h-full flex flex-col p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">课程表</h3>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {days[currentDay]}
        </span>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {days.map((day, index) => (
          <motion.button
            key={day}
            initial={isInteractive ? { opacity: 0, x: -20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={getTransition('interaction')}
            onClick={() => setCurrentDay(index)}
            className={`
              px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-colors
              ${currentDay === index
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            {day}
          </motion.button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence mode="popLayout">
          {periods.map((period) => {
            const item = todaySchedule.find((s) => s.period === period);
            const isCurrent = period === currentPeriod;

            return (
              <motion.div
                key={period}
                initial={isInteractive ? { opacity: 0, x: 20 } : {}}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: isCurrent ? 1.02 : 1,
                }}
                exit={{ opacity: 0, x: -20 }}
                transition={getTransition('interaction')}
                className={`
                  p-3 rounded-lg transition-all
                  ${isCurrent
                    ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-400 animate-pulse-slow'
                    : 'bg-gray-50 dark:bg-gray-700/50'
                  }
                  ${item ? 'cursor-pointer hover:shadow-md' : 'opacity-40'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    第{period}节
                  </span>
                  {item && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.startTime}-{item.endTime}
                    </span>
                  )}
                </div>
                {item && (
                  <div className="mt-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.subject}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {item.room}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
