import { RefObject } from 'react';
import { useGesture } from 'react-use-gesture';
import clamp from '../utils/clamp';

export interface GuestureBinding<T> {
  ref?: RefObject<T>;
  dragging: boolean;
  slide: number;
  count: number;
  setDragging: (state: boolean) => void;
  setSlide: (state: number) => void;
  onClick: (index: number) => void;
  setSpringProps: (index: number) => void;
}
/**
 * Bindings to set on the element
 */
export default function useGestureBinding<T = HTMLElement>({
  count,
  slide,
  dragging,
  ref,
  setDragging,
  setSlide,
  onClick,
  setSpringProps,
}: GuestureBinding<T>) {
  return useGesture(
    {
      onDrag: ({
        down,
        movement: [xDelta],
        direction: [xDirection],
        distance,
        cancel,
        first,
      }) => {
        if (first) {
          setDragging(true);
        }
        let parentElement = (ref?.current as unknown) as HTMLElement;
        if (parentElement) {
          const { width } = parentElement.getBoundingClientRect();

          if (down && distance > width / 2) {
            if (cancel) cancel();
            setSlide(clamp(slide + (xDirection > 0 ? -1 : 1), 0, count));
          }
          // see:  https://github.com/react-spring/react-spring/issues/861
          // @ts-ignore
          setSpringProps(index => ({
            offset: (down ? xDelta : 0) / width + (index - slide),
          }));
        }
      },
      onClick: () => {
        if (dragging) {
          setDragging(false);
          return;
        }
        onClick(slide);
      },
    },
    {
      drag: {
        delay: 200,
      },
    }
  );
}
