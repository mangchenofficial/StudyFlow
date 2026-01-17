import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { useAnimation } from '../hooks/useAnimation';

export const SystemStatusWidget = () => {
  const { settings } = useStore();
  const { shouldAnimate } = useAnimation();
  const [battery, setBattery] = useState(85);
  const [isCharging, setIsCharging] = useState(false);
  const [memory, setMemory] = useState(45);
  const [network, setNetwork] = useState<'connected' | 'disconnected' | 'unknown'>('connected');

  useEffect(() => {
    const interval = setInterval(() => {
      setBattery((prev) => {
        const change = Math.random() > 0.8 ? -1 : 0;
        return Math.max(0, Math.min(100, prev + change));
      });
      setMemory((prev) => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(20, Math.min(90, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBatteryIcon = () => {
    if (isCharging) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  };

  const getNetworkIcon = () => {
    if (network === 'connected') {
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    );
  };

  const isInteractive = shouldAnimate('interaction');

  return (
    <div className="w-full h-full flex flex-col p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">系统状态</h3>

      <div className="flex-1 space-y-4">
        <motion.div
          initial={isInteractive ? { opacity: 0, x: -20 } : {}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${getBatteryColor(battery)}`}>
            {getBatteryIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">电量</span>
              <motion.span
                key={battery}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className={`text-sm font-bold ${getBatteryColor(battery)}`}
              >
                {battery}%
              </motion.span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${battery}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full ${battery > 50 ? 'bg-green-500' : battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={isInteractive ? { opacity: 0, x: -20 } : {}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">内存</span>
              <motion.span
                key={memory}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                className="text-sm font-bold text-blue-500"
              >
                {memory.toFixed(1)}%
              </motion.span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${memory}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={isInteractive ? { opacity: 0, x: -20 } : {}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
            {getNetworkIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">网络</span>
              <span className={`text-sm font-bold ${network === 'connected' ? 'text-green-500' : 'text-red-500'}`}>
                {network === 'connected' ? '已连接' : '未连接'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
