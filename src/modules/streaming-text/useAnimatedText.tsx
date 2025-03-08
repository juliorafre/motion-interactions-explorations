'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, animate } from 'motion/react';

interface useAnimatedTextProps {
  text: string;
}

const useAnimatedText = ({ text }: useAnimatedTextProps) => {
  const animatedCursor = useMotionValue(0);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    let controls = animate(animatedCursor, text.length, {
      duration: 1.85,
      ease: 'linear',
      onUpdate: latest => {
        setCursor(prevValue => {
          if (latest < prevValue) {
            animatedCursor.jump(0);
            return 0;
          }
          return Math.floor(latest);
        });
      },
    });

    return () => controls.stop();
  }, [animatedCursor, text]);

  return text.slice(0, cursor);
};

export default useAnimatedText;
