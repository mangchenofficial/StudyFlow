import { useStore } from '../store';
import type { AnimationLevel } from '../types';

export const useAnimation = () => {
  const animationLevel = useStore((state) => state.settings.animationLevel);

  const shouldAnimate = (type: 'interaction' | 'reminder' | 'all') => {
    if (animationLevel === 'none') return false;
    if (animationLevel === 'reminders' && type !== 'reminder') return false;
    return true;
  };

  const getTransition = (type: 'interaction' | 'reminder' | 'all' = 'all') => {
    if (!shouldAnimate(type)) {
      return { duration: 0 };
    }
    return {
      duration: type === 'reminder' ? 0.5 : 0.3,
      ease: [0.4, 0, 0.2, 1],
    };
  };

  const getInitial = (type: 'interaction' | 'reminder' | 'all' = 'all') => {
    if (!shouldAnimate(type)) {
      return {};
    }
    return {
      opacity: 0,
      scale: 0.95,
    };
  };

  const getAnimate = (type: 'interaction' | 'reminder' | 'all' = 'all') => {
    if (!shouldAnimate(type)) {
      return {};
    }
    return {
      opacity: 1,
      scale: 1,
    };
  };

  const getExit = (type: 'interaction' | 'reminder' | 'all' = 'all') => {
    if (!shouldAnimate(type)) {
      return {};
    }
    return {
      opacity: 0,
      scale: 0.95,
    };
  };

  return {
    animationLevel,
    shouldAnimate,
    getTransition,
    getInitial,
    getAnimate,
    getExit,
  };
};
