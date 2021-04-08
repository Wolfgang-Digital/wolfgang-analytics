import React from 'react';
import { Grid, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from '@chakra-ui/core';

interface Props {
  value?: number;
  setValue: (value: number) => void;
  colour?: string;
}

export const PercentSlider: React.FC<Props> = ({ value, setValue, colour = 'green' }) => {
  const _colour = !!value ? (value >= 66 ? 'green' : value >= 33 ? 'orange' : 'red') : colour;
  return (
    <Grid templateColumns="1fr auto" alignItems="center" columnGap={4}>
      <Slider color={_colour} value={value} onChange={setValue} min={0} max={100}>
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb />
      </Slider>
      <Text minW="24px" textAlign="center">
        {!!value ? `${value}%` : '-'}
      </Text>
    </Grid>
  );
};
