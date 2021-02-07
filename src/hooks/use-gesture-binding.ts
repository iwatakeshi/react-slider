import { RefObject } from 'react';
import { useGesture } from 'react-use-gesture';
import clamp from '../utils/clamp';

export interface GuestureBinding {
  ref?: RefObject<HTMLDivElement>;
  dragging: boolean;
  slide: number;
  count: number;
  setDragging: (state: boolean) => void;
  setSlide: (state: number) => void;
  onClick: (index: number) => void;
  setSpringProps: (index: number) => void;
  slidesAtOnce: number;
}
/**
 * Bindings to set on the element
 */
export default function useGestureBinding({
  count,
  slide,
  dragging,
  ref,
  setDragging,
  setSlide,
  onClick,
  setSpringProps,
  slidesAtOnce,
}: GuestureBinding) {
  return useGesture(
    {
      onDrag: ({
        down,
        movement: [xDelta],
        direction: [xDirection],
        distance,
        cancel,
        first,
        active,
      }) => {
        if (first) {
          setDragging(true);
        }

        if ((ref as any)?.current?.parentElement) {
          const {
            width,
          } = (ref as any)?.current.parentElement.getBoundingClientRect();

          if (down && distance > width / 2) {
            if (cancel) cancel();
            if (active) {
              setSlide(
                clamp(
                  slide + (xDirection > 0 ? -1 : 1),
                  0,
                  count - slidesAtOnce
                )
              );
            }
          }

          // see:  https://github.com/react-spring/react-spring/issues/861
          // @ts-ignore
          setSpringProps(index => ({
            offset: (active && down ? xDelta : 0) / width + (index - slide),
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
