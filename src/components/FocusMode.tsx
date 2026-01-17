import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { useAnimation } from '../hooks/useAnimation';

export const FocusMode = () => {
  const { focusMode, startFocusMode, stopFocusMode, lockFocusMode, unlockFocusMode } = useStore();
  const { shouldAnimate, getTransition } = useAnimation();
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (focusMode.isActive && !focusMode.isLocked) {
      const timer = setInterval(() => {
        if (focusMode.remaining > 0) {
          focusMode.remaining -= 1;
        } else {
          stopFocusMode();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [focusMode.isActive, focusMode.isLocked, focusMode.remaining, stopFocusMode]);

  const handleUnlock = () => {
    if (pin === '1234') {
      setIsUnlocked(true);
      unlockFocusMode();
      setPin('');
    } else {
      setPin('');
    }
  };

  const isInteractive = shouldAnimate('interaction');
  const isReminder = shouldAnimate('reminder');

  if (!focusMode.isActive) {
    return (
      <motion.button
        initial={isInteractive ? { opacity: 0, scale: 0.8 } : {}}
        animate={{ opacity: 1, scale: 1 }}
        transition={getTransition('interaction')}
        onClick={() => startFocusMode(25 * 60)}
        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
      >
        开启专注模式
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              专注模式
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              通知已屏蔽，保持专注
            </p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl font-bold text-primary-500 mb-2"
              >
                {formatTime(focusMode.remaining)}
              </motion.div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${(focusMode.remaining / focusMode.duration) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-primary-500"
                />
              </div>
            </motion.div>

            {!focusMode.isLocked ? (
              <div className="space-y-3">
                <motion.button
                  initial={isInteractive ? { opacity: 0, y: 20 } : {}}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => lockFocusMode()}
                  className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                >
                  锁定专注
                </motion.button>
                <motion.button
                  initial={isInteractive ? { opacity: 0, y: 20 } : {}}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={stopFocusMode}
                  className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
                >
                  退出专注
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  请输入PIN码解锁
                </motion.div>
                <motion.input
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="输入PIN码"
                  maxLength={4}
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={handleUnlock}
                  className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                >
                  解锁
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
