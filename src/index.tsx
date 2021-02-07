import React, {
  Children,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useSprings, animated } from 'react-spring';
import Container from './container';
import { LeftSliderControl, RightSliderControl } from './control';
import useGestureBinding from './hooks/use-gesture-binding';
import Slide from './slide';

export interface SliderProps<T = HTMLDivElement> extends HTMLAttributes<T> {
  /** The active index in the slider. */
  index?: number;
  children?: ReactNode | ReactNode[];
  arrows?: {
    left: ReactNode;
    right: ReactNode;
  };
  onSlideChange?: (slide: number) => void;
  setSlide?: (slide: number) => number;
  interval?: number;
  container?: typeof React.Component;
  autoplay?: boolean;
  dots?: (
    index: number,
    length: number,
    previous: () => void,
    next: () => void
  ) => ReactNode;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * Slider
 */

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      interval = 1000,
      autoplay = false,
      index: activeIndex = 0,
      setSlide: setSlideCustom = undefined,
      children,
      arrows,
      container: CustomContainer,
      onSlideChange = () => undefined,
      dots,
      ...props
    },
    ref
  ) => {
    // Set/Get the dragging state
    const [dragging, setDragging] = useState(false);
    // Set/Get the slide state
    const [slide, _setSlide] = useState(0);

    // Updates the slide state
    const setSlide = setSlideCustom
      ? (index: number) => _setSlide(setSlideCustom(index))
      : _setSlide;

    const [springProps, setSpringProps] = useSprings(
      Children.count(children),
      index => ({
        offset: index,
      })
    );

    // Sets pointer events none to every child and preserves styles
    const _children = Children.toArray(children).map((child, index) => (
      <Slide key={index}>{child}</Slide> // eslint-disable-line react/no-array-index-key
    ));

    const gestureBinds = useGestureBinding({
      count: Children.count(children) - 1,
      dragging,
      slide,
      ref,
      setDragging,
      setSlide,
      onClick(index) {
        let childrenProps = _children[index]?.props?.children?.props;
        if (childrenProps?.onClick) {
          childrenProps.onClick();
        }
      },
      setSpringProps,
    });

    // Triggered on slide change
    useEffect(() => {
      // see:  https://github.com/react-spring/react-spring/issues/861
      // @ts-ignore
      setSpringProps(index => ({
        offset: index - slide,
      }));
      onSlideChange(slide);
    }, [slide, setSpringProps, onSlideChange]);

    // Effect for autosliding
    useEffect(() => {
      let id: number;

      if (autoplay && interval > 0) {
        id = (setInterval(() => {
          const targetIndex = (slide + 1) % Children.count(children);
          setSlide(targetIndex);
        }, interval) as unknown) as number;
      }

      return () => {
        if (id) clearInterval(id);
      };
    });

    const next = () => {
      if (slide === Children.count(children) - 1) {
        setSlide(0);
        return;
      }

      setSlide(slide + 1);
    };

    const previous = () => {
      if (slide === 0) {
        setSlide(Children.count(children) - 1);
        return;
      }

      setSlide(slide - 1);
    };

    const left = arrows?.left,
      right = arrows?.right;

    const renderable = springProps?.map(({ offset }, index) => (
      <animated.div
        {...gestureBinds()}
        key={index} // eslint-disable-line react/no-array-index-key
        style={{
          transform: offset.interpolate(
            offsetX => `translate3d(${offsetX * 100}%, 0, 0)`
          ),
          position: 'absolute',
          width: '100%',
          height: '100%',
          willChange: 'transform',
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
        }}
      >
        <Slide>{_children[index]}</Slide>
      </animated.div>
    ));

    if (CustomContainer) {
      return (
        <CustomContainer ref={ref as any} {...(props as any)}>
          {left && (
            <LeftSliderControl onClick={previous}>{left}</LeftSliderControl>
          )}
          {right && (
            <RightSliderControl onClick={next}>{right}</RightSliderControl>
          )}
          {renderable}
          {dots && dots(slide, Children.count(children), previous, next)}
        </CustomContainer>
      );
    }

    return (
      <Container ref={ref as any} {...(props as any)}>
        {left && (
          <LeftSliderControl onClick={previous}>{left}</LeftSliderControl>
        )}
        {right && (
          <RightSliderControl onClick={next}>{right}</RightSliderControl>
        )}
        {renderable}
        {dots && dots(slide, Children.count(children), previous, next)}
      </Container>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
