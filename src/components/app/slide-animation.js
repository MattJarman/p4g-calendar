import spring from 'react-motion/lib/spring';

const fadeConfig = { stiffness: 200, damping: 22 };
const slideConfig = { stiffness: 330, damping: 30 };

const slideRight = {
  atEnter: {
    opacity: 0,
    offset: 100,
    position: 0,
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
    offset: spring(-100, slideConfig),
    position: 2,
  },
  atActive: {
    opacity: spring(1, slideConfig),
    offset: spring(0, slideConfig),
    position: 1,
  },
  mapStyles: (styles) => {
    return {
      position: styles.position <= 1 ? 'relative' : 'absolute',
      width: '100%',
      opacity: styles.opacity,
      transform: `translateX(${styles.offset}%)`,
    };
  },
};

const slideLeft = {
  atEnter: {
    opacity: 0,
    offset: -100,
    position: 0,
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
    offset: spring(100, slideConfig),
    position: 2,
  },
  atActive: {
    opacity: spring(1, slideConfig),
    offset: spring(0, slideConfig),
    position: 1,
  },
  mapStyles: (styles) => {
    return {
      position: styles.position <= 1 ? 'relative' : 'absolute',
      width: '100%',
      opacity: styles.opacity,
      transform: `translateX(${styles.offset}%)`,
    };
  },
};

export { slideLeft, slideRight };
