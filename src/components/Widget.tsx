import { motion } from 'framer-motion';
import { useStore } from '../store';
import { useAnimation } from '../hooks/useAnimation';
import type { Widget as WidgetType } from '../types';

interface WidgetProps {
  widget: WidgetType;
  children: React.ReactNode;
  onDrag?: (delta: { x: number; y: number }) => void;
  onDragEnd?: () => void;
  onResize?: (width: number, height: number) => void;
}

export const Widget = ({ widget, children, onDrag, onDragEnd, onResize }: WidgetProps) => {
  const { selectedWidgetIds, selectWidget, deselectWidget } = useStore();
  const { shouldAnimate, getTransition, getInitial, getAnimate } = useAnimation();
  
  const isSelected = selectedWidgetIds.includes(widget.id);
  const isInteractive = shouldAnimate('interaction');

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      if (isSelected) {
        deselectWidget(widget.id);
      } else {
        selectWidget(widget.id);
      }
    }
  };

  return (
    <motion.div
      initial={isInteractive ? getInitial('interaction') : {}}
      animate={isInteractive ? getAnimate('interaction') : {}}
      exit={isInteractive ? { opacity: 0, scale: 0.95 } : {}}
      transition={getTransition('interaction')}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDrag={(_, info) => onDrag?.({ x: info.delta.x, y: info.delta.y })}
      onDragEnd={onDragEnd}
      style={{
        position: 'absolute',
        left: widget.position.x,
        top: widget.position.y,
        width: widget.size.width,
        height: widget.size.height,
        zIndex: widget.zIndex,
      }}
      onMouseDown={handleMouseDown}
      className={`
        glass rounded-2xl widget-shadow
        ${isSelected ? 'ring-2 ring-primary-400 animate-pulse-slow' : ''}
        ${widget.minimized ? 'opacity-50' : ''}
      `}
    >
      {children}
    </motion.div>
  );
};
