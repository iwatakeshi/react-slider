import React, {
  Children,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSprings, animated } from 'react-spring';
import Container from './container';
import { LeftSliderControl, RightSliderControl } from './control';
import useGestureBinding from './hooks/use-gesture-binding';
import useInterval from './hooks/use-interval';
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
  slidesAtOnce?: number;
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

function Slider({
  interval = 1000,
  autoplay = false,
  index: activeIndex = 0,
  slidesAtOnce = 1,
  setSlide: setSlideCustom = undefined,
  children,
  arrows,
  container: CustomContainer,
  onSlideChange = () => undefined,
  dots,
  ...props
}: SliderProps) {
  // Create an internal ref
  const ref = useRef<HTMLDivElement>(null);
  // Get the number of children
  const count = () => Children.count(children);
  // Set/Get the dragging state
  const [dragging, setDragging] = useState(false);
  // Set/Get the slide state
  const [slide, _setSlide] = useState(0);

  // Updates the slide state
  const setSlide = setSlideCustom
    ? (index: number) => _setSlide(setSlideCustom(index))
    : _setSlide;

  // Use react-spring
  const [springProps, setSpringProps] = useSprings(count(), index => ({
    offset: index,
  }));

  // Set the gesture bindings
  const gestureBinds = useGestureBinding({
    count: count(),
    slidesAtOnce,
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
  useInterval(
    () => {
      const targetIndex = (slide + 1) % count();
      setSlide(targetIndex);
    },
    interval,
    [autoplay, slide, children, count()],
    autoplay
  );

  // Jump to slide index when prop changes
  useEffect(() => {
    setSlide(activeIndex % count());
  }, [activeIndex, children, count()]);

  // Sets pointer events none to every child and preserves styles
  const _children = Children.toArray(children).map((child, index) => (
    <Slide key={index}>{child}</Slide> // eslint-disable-line react/no-array-index-key
  ));

  const isStart = (index: number) => index === 0;
  const isEnd = (index: number) => index === count() - 1;

  const next = () => (isEnd(slide) ? setSlide(0) : setSlide(slide + 1));
  const previous = () =>
    isStart(slide) ? setSlide(count() - 1) : setSlide(slide - 1);

  const left = arrows?.left,
    right = arrows?.right;

  const render = () =>
    springProps.map(({ offset }, index) => (
      <animated.div
        {...gestureBinds()}
        key={index} // eslint-disable-line react/no-array-index-key
        style={{
          transform: offset.interpolate(
            offsetX => `translate3d(${offsetX * 100}%, 0, 0)`
          ),
          position: 'absolute',
          width: `${100 / slidesAtOnce}%`,
          height: '100%',
          willChange: 'transform',
        }}
      >
        {_children[index]}
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
        {render()}
        {dots && dots(slide, count(), previous, next)}
      </CustomContainer>
    );
  }

  return (
    <Container ref={ref as any} {...(props as any)}>
      {left && <LeftSliderControl onClick={previous}>{left}</LeftSliderControl>}
      {right && <RightSliderControl onClick={next}>{right}</RightSliderControl>}
      {render()}
      {dots && dots(slide, count(), previous, next)}
    </Container>
  );
}

export default Slider;
