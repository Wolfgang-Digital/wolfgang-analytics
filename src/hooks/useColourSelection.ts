import { useState } from 'react';

const colours = [
  'red.400',
  'orange.400',
  'yellow.400',
  'green.400',
  'teal.400',
  'blue.400',
  'cyan.400',
  'purple.400',
  'pink.400'
];

export const useColourSelection = () => {
  const [count, setCount] = useState(0);

  return () => {
    setCount(count + 1);
    return colours[count % colours.length];
  };
};