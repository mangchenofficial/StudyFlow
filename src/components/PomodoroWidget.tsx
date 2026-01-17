import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { useAnimation } from '../hooks/useAnimation';

export const PomodoroWidget = () => {
  const { pomodoro, startPomodoro, pausePomodoro, resumePomodoro, stopPomodoro, setPomodoroDuration } = useStore();
  const { shouldAnimate, getTransition } = useAnimation();
  const [localRemaining, setLocalRemaining] = useState(pomodoro.remaining);

  useEffect(() => {
    setLocalRemaining(pomodoro.remaining);
  }, [pomodoro.remaining]);

  useEffect(() => {
    if (!pomodoro.isRunning || pomodoro.isPaused) return;

    const timer = setInterval(() => {
      setLocalRemaining((prev) => {
        if (prev <= 1) {
          stopPomodoro();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pomodoro.isRunning, pomodoro.isPaused, stopPomodoro]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (localRemaining / pomodoro.duration) * 100;
  const isInteractive = shouldAnimate('interaction');
  const isReminder = shouldAnimate('reminder');

  const durations = [5, 15, 25, 45, 60];

  return (
    <div className="w-full h-full flex flex-col p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">番茄钟</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${pomodoro.mode === 'work' ? 'bg-primary-100 text-primary-700' : 'bg-green-100 text-green-700'}`}>
          {pomodoro.mode === 'work' ? '专注' : '休息'}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={isInteractive ? { scale: 0 } : {}}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-32 h-32 mb-4"
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-primary-500"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5 }}
              style={{
                strokeDasharray: '351.86',
                strokeDashoffset: 351.86 * (1 - progress / 100),
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              key={localRemaining}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            >
              {formatTime(localRemaining)}
            </motion.span>
          </div>
        </motion.div>

        <div className="flex gap-2 mb-4">
          {durations.map((duration) => (
            <motion.button
              key={duration}
              initial={isInteractive ? { opacity: 0, y: 10 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition('interaction')}
              onClick={() => setPomodoroDuration(duration * 60)}
              className={`
                px-3 py-1 rounded-lg text-sm transition-colors
                ${pomodoro.duration === duration * 60
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {duration}分
            </motion.button>
          ))}
        </div>

        <div className="flex gap-2">
          <AnimatePresence mode="wait">
            {!pomodoro.isRunning ? (
              <motion.button
                key="start"
                initial={isInteractive ? { opacity: 0, scale: 0.8 } : {}}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={getTransition('interaction')}
                onClick={startPomodoro}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                开始
              </motion.button>
            ) : pomodoro.isPaused ? (
              <motion.button
                key="resume"
                initial={isInteractive ? { opacity: 0, scale: 0.8 } : {}}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={getTransition('interaction')}
                onClick={resumePomodoro}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                继续
              </motion.button>
            ) : (
              <motion.button
                key="pause"
                initial={isInteractive ? { opacity: 0, scale: 0.8 } : {}}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={getTransition('interaction')}
                onClick={pausePomodoro}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
              >
                暂停
              </motion.button>
            )}
          </AnimatePresence>
          {pomodoro.isRunning && (
            <motion.button
              initial={isInteractive ? { opacity: 0, scale: 0.8 } : {}}
              animate={{ opacity: 1, scale: 1 }}
              transition={getTransition('interaction')}
              onClick={stopPomodoro}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              停止
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
