import { Handle, Symbol } from 'hypocube';
import React from 'react';
import { PlanarDataPoint } from '../store/selectors';
import tinycolor from 'tinycolor2';

interface Props {
  point: PlanarDataPoint;
  isFaded: boolean;
}

const fade = (baseColor: string) => {
  return tinycolor(baseColor).desaturate(80).setAlpha(0.2).toHslString();
};

export const DataPoint: React.FC<Props> = ({ point, isFaded }) => {
  const color = isFaded ? fade(point.baseColor) : point.baseColor;

  return (
    <Handle onPointerDown={() => console.log(point.compoundKey)}>
      <Symbol
        point={point.position}
        fill={color}
        strokeWidth={0}
        size={point.voteShare * 5}
      />
    </Handle>
  );
};
