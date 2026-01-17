import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { useAnimation } from '../hooks/useAnimation';

export const TodoWidget = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useStore();
  const { shouldAnimate, getTransition } = useAnimation();
  const [newTodo, setNewTodo] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'study', 'life', 'other'];
  const categoryLabels: Record<string, string> = {
    all: '全部',
    study: '学习',
    life: '生活',
    other: '其他',
  };

  const filteredTodos = activeCategory === 'all' 
    ? todos 
    : todos.filter((todo) => todo.category === activeCategory);

  const isInteractive = shouldAnimate('interaction');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim(), activeCategory === 'all' ? 'study' : activeCategory);
      setNewTodo('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">待办清单</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {filteredTodos.filter((t) => !t.completed).length}/{filteredTodos.length}
        </span>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            initial={isInteractive ? { opacity: 0, x: -20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={getTransition('interaction')}
            onClick={() => setActiveCategory(category)}
            className={`
              px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-colors
              ${activeCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            {categoryLabels[category]}
          </motion.button>
        ))}
      </div>

      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="添加待办事项..."
            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
          >
            添加
          </motion.button>
        </div>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredTodos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={isInteractive ? { opacity: 0, y: 20 } : {}}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: todo.completed ? 0.98 : 1,
              }}
              exit={{ 
                opacity: 0, 
                x: -100,
                height: 0,
                marginBottom: 0,
              }}
              transition={{ 
                ...getTransition('interaction'),
                delay: isInteractive ? index * 0.05 : 0,
              }}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all
                ${todo.completed 
                  ? 'bg-gray-100 dark:bg-gray-700/50 opacity-60' 
                  : 'bg-gray-50 dark:bg-gray-700/50'
                }
              `}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleTodo(todo.id)}
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${todo.completed 
                    ? 'bg-primary-500 border-primary-500' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
                  }
                `}
              >
                {todo.completed && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </motion.button>
              <div className="flex-1 min-w-0">
                <p className={`
                  text-sm truncate transition-all
                  ${todo.completed 
                    ? 'line-through text-gray-500 dark:text-gray-400' 
                    : 'text-gray-800 dark:text-white'
                  }
                `}>
                  {todo.text}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {categoryLabels[todo.category]}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeTodo(todo.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredTodos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            暂无待办事项
          </motion.div>
        )}
      </div>
    </div>
  );
};
