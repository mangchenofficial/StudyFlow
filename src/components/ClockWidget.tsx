import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { useAnimation } from '../hooks/useAnimation';

export const ClockWidget = () => {
  const { settings } = useStore();
  const { shouldAnimate, getTransition } = useAnimation();
  const [time, setTime] = useState(new Date());
  const [isDigital, setIsDigital] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isInteractive = shouldAnimate('interaction');

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const getClockHandRotation = (value: number, max: number) => {
    return (value / max) * 360;
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl cursor-pointer"
      onClick={() => setIsDigital(!isDigital)}
    >
      <AnimatePresence mode="wait">
        {isDigital ? (
          <motion.div
            key="digital"
            initial={isInteractive ? { opacity: 0, scale: 0.95 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={getTransition('interaction')}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-4xl font-bold text-gray-800 dark:text-white mb-2"
            >
              {formatTime(time)}
            </motion.div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {time.toLocaleDateString('zh-CN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="analog"
            initial={isInteractive ? { opacity: 0, scale: 0.95 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={getTransition('interaction')}
            className="relative"
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke={settings.theme === 'dark' ? '#4b5563' : '#e5e7eb'}
                strokeWidth="2"
              />
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x1 = 60 + 50 * Math.cos(angle);
                const y1 = 60 + 50 * Math.sin(angle);
                const x2 = 60 + 55 * Math.cos(angle);
                const y2 = 60 + 55 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={settings.theme === 'dark' ? '#9ca3af' : '#6b7280'}
                    strokeWidth="2"
                  />
                );
              })}
              <motion.line
                x1="60"
                y1="60"
                x2="60"
                y2="35"
                stroke={settings.theme === 'dark' ? '#f3f4f6' : '#1f2937'}
                strokeWidth="3"
                strokeLinecap="round"
                animate={{
                  rotate: getClockHandRotation(time.getHours() % 12 + time.getMinutes() / 60, 12),
                }}
                transformOrigin="60 60"
                transition={{ duration: 0.1 }}
              />
              <motion.line
                x1="60"
                y1="60"
                x2="60"
                y2="25"
                stroke={settings.theme === 'dark' ? '#f3f4f6' : '#1f2937'}
                strokeWidth="2"
                strokeLinecap="round"
                animate={{
                  rotate: getClockHandRotation(time.getMinutes(), 60),
                }}
                transformOrigin="60 60"
                transition={{ duration: 0.1 }}
              />
              <motion.line
                x1="60"
                y1="60"
                x2="60"
                y2="20"
                stroke="#ef4444"
                strokeWidth="1"
                strokeLinecap="round"
                animate={{
                  rotate: getClockHandRotation(time.getSeconds(), 60),
                }}
                transformOrigin="60 60"
                transition={{ duration: 0.1 }}
              />
              <circle
                cx="60"
                cy="60"
                r="3"
                fill={settings.theme === 'dark' ? '#f3f4f6' : '#1f2937'}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
