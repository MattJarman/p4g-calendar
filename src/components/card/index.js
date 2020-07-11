import React, { useState } from 'react';
import { useSpring, animated as a } from 'react-spring';

function Card(props) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      className="relative w-full h-24 mx-4 text-xs md:text-base md:w-1/3"
      onClick={() => set((state) => !state)}
    >
      <a.div
        className="bg-indigo-400 flippable-card"
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      >
        <p>{props.front}</p>
      </a.div>
      <a.div
        className="bg-green-500 flippable-card"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      >
        <p>{props.back}</p>
      </a.div>
    </div>
  );
}

export default Card;
