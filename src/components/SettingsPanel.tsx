import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { useAnimation } from '../hooks/useAnimation';

export const SettingsPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { settings, updateSettings, toggleTheme, toggleEyeCare, setAnimationLevel } = useStore();
  const { shouldAnimate, getTransition } = useAnimation();

  const isInteractive = shouldAnimate('interaction');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">设置</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={isInteractive ? { opacity: 0, x: -20 } : {}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">主题</h3>
              <div className="flex gap-2">
                {(['light', 'dark', 'system'] as const).map((theme) => (
                  <motion.button
                    key={theme}
                    initial={isInteractive ? { opacity: 0, scale: 0.8 } : {}}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => updateSettings({ theme })}
                    className={`
                      flex-1 px-4 py-3 rounded-lg font-medium transition-all
                      ${settings.theme === theme
                        ? 'bg-primary-500 text-white ring-2 ring-primary-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    {theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '跟随系统'}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={isInteractive ? { opacity: 0, x: -20 } : {}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">护眼模式</h3>
              <motion.button
                initial={isInteractive ? { opacity: 0, scale: 0.8 } : {}}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={toggleEyeCare}
                className={`
                  w-full px-4 py-3 rounded-lg font-medium transition-all
                  ${settings.eyeCare
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {settings.eyeCare ? '已开启' : '已关闭'}
              </motion.button>
            </motion.div>

            <motion.div
              initial={isInteractive ? { opacity: 0, x: -20 } : {}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">动效设置</h3>
              <div className="space-y-2">
                {(['none', 'reminders', 'all'] as const).map((level) => (
                  <motion.button
                    key={level}
                    initial={isInteractive ? { opacity: 0, x: -20 } : {}}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + ['none', 'reminders', 'all'].indexOf(level) * 0.1 }}
                    onClick={() => setAnimationLevel(level)}
                    className={`
                      w-full px-4 py-3 rounded-lg font-medium transition-all text-left
                      ${settings.animationLevel === level
                        ? 'bg-primary-500 text-white ring-2 ring-primary-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        {level === 'none' ? '关闭所有动效' : level === 'reminders' ? '仅保留提醒动效' : '开启所有动效'}
                      </span>
                      {settings.animationLevel === level && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={isInteractive ? { opacity: 0, x: -20 } : {}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">背景设置</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    背景类型
                  </label>
                  <div className="flex gap-2">
                    {(['color', 'image'] as const).map((type) => (
                      <motion.button
                        key={type}
                        initial={isInteractive ? { opacity: 0, scale: 0.8 } : {}}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => updateSettings({ background: { ...settings.background, type } })}
                        className={`
                          flex-1 px-4 py-2 rounded-lg font-medium transition-all
                          ${settings.background.type === type
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }
                        `}
                      >
                        {type === 'color' ? '纯色' : '图片'}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    透明度
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.background.opacity}
                    onChange={(e) => updateSettings({ background: { ...settings.background, opacity: parseFloat(e.target.value) } })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {Math.round(settings.background.opacity * 100)}%
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
