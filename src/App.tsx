import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store';
import { useAnimation } from './hooks/useAnimation';
import { Widget } from './components/Widget';
import { ScheduleWidget } from './components/ScheduleWidget';
import { ClockWidget } from './components/ClockWidget';
import { PomodoroWidget } from './components/PomodoroWidget';
import { TodoWidget } from './components/TodoWidget';
import { SystemStatusWidget } from './components/SystemStatusWidget';
import { FocusMode } from './components/FocusMode';
import { SettingsPanel } from './components/SettingsPanel';
import type { Widget as WidgetType } from './types';

export default function App() {
  const { widgets, settings, addWidget, removeWidget, updateWidgetPosition, clearSelection } = useStore();
  const { shouldAnimate, getTransition } = useAnimation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearSelection();
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearSelection]);

  const handleAddWidget = (type: WidgetType['type']) => {
    const newWidget: WidgetType = {
      id: Date.now().toString(),
      type,
      position: {
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      },
      size: getDefaultSize(type),
      zIndex: widgets.length + 1,
      minimized: false,
    };
    addWidget(newWidget);
  };

  const getDefaultSize = (type: WidgetType['type']) => {
    switch (type) {
      case 'schedule':
        return { width: 320, height: 400 };
      case 'clock':
        return { width: 200, height: 200 };
      case 'pomodoro':
        return { width: 280, height: 350 };
      case 'todo':
        return { width: 300, height: 400 };
      case 'system':
        return { width: 250, height: 200 };
      default:
        return { width: 200, height: 200 };
    }
  };

  const renderWidgetContent = (widget: WidgetType) => {
    switch (widget.type) {
      case 'schedule':
        return <ScheduleWidget />;
      case 'clock':
        return <ClockWidget />;
      case 'pomodoro':
        return <PomodoroWidget />;
      case 'todo':
        return <TodoWidget />;
      case 'system':
        return <SystemStatusWidget />;
      default:
        return null;
    }
  };

  const isInteractive = shouldAnimate('interaction');

  return (
    <div
      className={`
        w-full h-screen relative overflow-hidden transition-colors duration-500
        ${settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-green-50'}
        ${settings.eyeCare ? 'eye-care' : ''}
      `}
      style={{
        backgroundColor: settings.background.type === 'color' 
          ? settings.background.value 
          : undefined,
        opacity: settings.background.opacity,
      }}
    >
      <FocusMode />
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <motion.header
        initial={isInteractive ? { y: -50, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={getTransition('interaction')}
        className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-40 glass"
      >
        <div className="flex items-center gap-4">
          <motion.h1
            initial={isInteractive ? { opacity: 0 } : {}}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-gray-800 dark:text-white"
          >
            StudyFlow
          </motion.h1>
          <motion.button
            initial={isInteractive ? { opacity: 0 } : {}}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            initial={isInteractive ? { opacity: 0 } : {}}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.api?.minimize?.()}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </motion.button>
          <motion.button
            initial={isInteractive ? { opacity: 0 } : {}}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.api?.close?.()}
            className="p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
      </motion.header>

      <main className="w-full h-full pt-12 pb-16">
        <AnimatePresence>
          {widgets.map((widget, index) => (
            <Widget
              key={widget.id}
              widget={widget}
              onDrag={(delta) => {
                updateWidgetPosition(widget.id, {
                  x: widget.position.x + delta.x,
                  y: widget.position.y + delta.y,
                });
              }}
            >
              {renderWidgetContent(widget)}
            </Widget>
          ))}
        </AnimatePresence>
      </main>

      <motion.footer
        initial={isInteractive ? { y: 50, opacity: 0 } : {}}
        animate={{ y: 0, opacity: 1 }}
        transition={getTransition('interaction')}
        className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center gap-4 z-40 glass"
      >
        <motion.button
          initial={isInteractive ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAddWidget('schedule')}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all text-gray-800 dark:text-white font-medium"
        >
          课程表
        </motion.button>
        <motion.button
          initial={isInteractive ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAddWidget('clock')}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all text-gray-800 dark:text-white font-medium"
        >
          时钟
        </motion.button>
        <motion.button
          initial={isInteractive ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAddWidget('pomodoro')}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all text-gray-800 dark:text-white font-medium"
        >
          番茄钟
        </motion.button>
        <motion.button
          initial={isInteractive ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAddWidget('todo')}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all text-gray-800 dark:text-white font-medium"
        >
          待办
        </motion.button>
        <motion.button
          initial={isInteractive ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAddWidget('system')}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all text-gray-800 dark:text-white font-medium"
        >
          系统状态
        </motion.button>
      </motion.footer>
    </div>
  );
}
