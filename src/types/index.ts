export type AnimationLevel = 'none' | 'reminders' | 'all';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Widget {
  id: string;
  type: 'schedule' | 'clock' | 'pomodoro' | 'todo' | 'system';
  position: Position;
  size: Size;
  zIndex: number;
  minimized: boolean;
}

export interface ScheduleItem {
  id: string;
  day: number;
  period: number;
  subject: string;
  room: string;
  startTime: string;
  endTime: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  createdAt: number;
}

export interface Layout {
  id: string;
  name: string;
  widgets: Widget[];
  createdAt: number;
}

export interface PomodoroState {
  isRunning: boolean;
  isPaused: boolean;
  duration: number;
  remaining: number;
  mode: 'work' | 'break';
}

export interface FocusModeState {
  isActive: boolean;
  isLocked: boolean;
  startTime: number;
  duration: number;
  remaining: number;
}

export interface SystemStatus {
  battery: number;
  isCharging: boolean;
  memory: number;
  network: 'connected' | 'disconnected' | 'unknown';
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  eyeCare: boolean;
  animationLevel: AnimationLevel;
  background: {
    type: 'color' | 'image';
    value: string;
    opacity: number;
  };
  autoSave: boolean;
  autoSaveInterval: number;
}
