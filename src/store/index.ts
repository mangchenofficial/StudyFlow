import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Widget, 
  ScheduleItem, 
  TodoItem, 
  Layout, 
  PomodoroState, 
  FocusModeState,
  Settings,
  Position 
} from '../types';

interface AppState {
  widgets: Widget[];
  schedule: ScheduleItem[];
  todos: TodoItem[];
  layouts: Layout[];
  currentLayoutId: string | null;
  pomodoro: PomodoroState;
  focusMode: FocusModeState;
  settings: Settings;
  selectedWidgetIds: string[];
  
  updateWidgetPosition: (id: string, position: Position) => void;
  updateWidgetSize: (id: string, width: number, height: number) => void;
  addWidget: (widget: Widget) => void;
  removeWidget: (id: string) => void;
  selectWidget: (id: string) => void;
  deselectWidget: (id: string) => void;
  clearSelection: () => void;
  
  addScheduleItem: (item: ScheduleItem) => void;
  updateScheduleItem: (id: string, item: Partial<ScheduleItem>) => void;
  removeScheduleItem: (id: string) => void;
  
  addTodo: (text: string, category: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  
  saveLayout: (name: string) => void;
  loadLayout: (id: string) => void;
  deleteLayout: (id: string) => void;
  
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resumePomodoro: () => void;
  stopPomodoro: () => void;
  setPomodoroDuration: (duration: number) => void;
  
  startFocusMode: (duration: number) => void;
  stopFocusMode: () => void;
  lockFocusMode: () => void;
  unlockFocusMode: () => void;
  
  updateSettings: (settings: Partial<Settings>) => void;
  toggleTheme: () => void;
  toggleEyeCare: () => void;
  setAnimationLevel: (level: Settings['animationLevel']) => void;
}

const initialPomodoroState: PomodoroState = {
  isRunning: false,
  isPaused: false,
  duration: 25 * 60,
  remaining: 25 * 60,
  mode: 'work',
};

const initialFocusModeState: FocusModeState = {
  isActive: false,
  isLocked: false,
  startTime: 0,
  duration: 25 * 60,
  remaining: 25 * 60,
};

const initialSettings: Settings = {
  theme: 'system',
  eyeCare: false,
  animationLevel: 'all',
  background: {
    type: 'color',
    value: '#f0f9ff',
    opacity: 1,
  },
  autoSave: true,
  autoSaveInterval: 30000,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      widgets: [],
      schedule: [],
      todos: [],
      layouts: [],
      currentLayoutId: null,
      pomodoro: initialPomodoroState,
      focusMode: initialFocusModeState,
      settings: initialSettings,
      selectedWidgetIds: [],

      updateWidgetPosition: (id, position) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, position } : w
          ),
        })),

      updateWidgetSize: (id, width, height) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, size: { width, height } } : w
          ),
        })),

      addWidget: (widget) =>
        set((state) => ({
          widgets: [...state.widgets, widget],
        })),

      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
          selectedWidgetIds: state.selectedWidgetIds.filter((wid) => wid !== id),
        })),

      selectWidget: (id) =>
        set((state) => ({
          selectedWidgetIds: [...state.selectedWidgetIds, id],
        })),

      deselectWidget: (id) =>
        set((state) => ({
          selectedWidgetIds: state.selectedWidgetIds.filter((wid) => wid !== id),
        })),

      clearSelection: () =>
        set({
          selectedWidgetIds: [],
        }),

      addScheduleItem: (item) =>
        set((state) => ({
          schedule: [...state.schedule, item],
        })),

      updateScheduleItem: (id, item) =>
        set((state) => ({
          schedule: state.schedule.map((s) =>
            s.id === id ? { ...s, ...item } : s
          ),
        })),

      removeScheduleItem: (id) =>
        set((state) => ({
          schedule: state.schedule.filter((s) => s.id !== id),
        })),

      addTodo: (text, category) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
              category,
              createdAt: Date.now(),
            },
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      saveLayout: (name) =>
        set((state) => {
          const newLayout: Layout = {
            id: Date.now().toString(),
            name,
            widgets: [...state.widgets],
            createdAt: Date.now(),
          };
          return {
            layouts: [...state.layouts, newLayout],
            currentLayoutId: newLayout.id,
          };
        }),

      loadLayout: (id) =>
        set((state) => {
          const layout = state.layouts.find((l) => l.id === id);
          if (!layout) return state;
          return {
            widgets: [...layout.widgets],
            currentLayoutId: id,
          };
        }),

      deleteLayout: (id) =>
        set((state) => ({
          layouts: state.layouts.filter((l) => l.id !== id),
          currentLayoutId: state.currentLayoutId === id ? null : state.currentLayoutId,
        })),

      startPomodoro: () =>
        set((state) => ({
          pomodoro: {
            ...state.pomodoro,
            isRunning: true,
            isPaused: false,
            remaining: state.pomodoro.duration,
          },
        })),

      pausePomodoro: () =>
        set((state) => ({
          pomodoro: {
            ...state.pomodoro,
            isPaused: true,
          },
        })),

      resumePomodoro: () =>
        set((state) => ({
          pomodoro: {
            ...state.pomodoro,
            isPaused: false,
          },
        })),

      stopPomodoro: () =>
        set({
          pomodoro: initialPomodoroState,
        }),

      setPomodoroDuration: (duration) =>
        set((state) => ({
          pomodoro: {
            ...state.pomodoro,
            duration,
            remaining: duration,
          },
        })),

      startFocusMode: (duration) =>
        set((state) => ({
          focusMode: {
            isActive: true,
            isLocked: false,
            startTime: Date.now(),
            duration,
            remaining: duration,
          },
        })),

      stopFocusMode: () =>
        set({
          focusMode: initialFocusModeState,
        }),

      lockFocusMode: () =>
        set((state) => ({
          focusMode: {
            ...state.focusMode,
            isLocked: true,
          },
        })),

      unlockFocusMode: () =>
        set((state) => ({
          focusMode: {
            ...state.focusMode,
            isLocked: false,
          },
        })),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      toggleTheme: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            theme: state.settings.theme === 'light' ? 'dark' : 'light',
          },
        })),

      toggleEyeCare: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            eyeCare: !state.settings.eyeCare,
          },
        })),

      setAnimationLevel: (level) =>
        set((state) => ({
          settings: {
            ...state.settings,
            animationLevel: level,
          },
        })),
    }),
    {
      name: 'studyflow-storage',
      partialize: (state) => ({
        widgets: state.widgets,
        schedule: state.schedule,
        todos: state.todos,
        layouts: state.layouts,
        currentLayoutId: state.currentLayoutId,
        settings: state.settings,
      }),
    }
  )
);
