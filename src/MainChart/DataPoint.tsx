import { Handle, Symbol } from 'hypocube';
import React from 'react';
import { PlanarDataPoint } from '../store/selectors';
import { colorFade as fade } from './utils';

interface Props {
  point: PlanarDataPoint;
  isFaded: boolean;
  highlight: (key: string) => void;
}

export const DataPoint: React.FC<Props> = ({
  point,
  isFaded,
  highlight,
  unhighlight,
}) => {
  const color = isFaded ? fade(point.baseColor) : point.baseColor;

  return (
    <Handle
      onPointerEnter={() => highlight(point.compoundKey)}
      onPointerLeave={() => unhighlight(point.compoundKey)}
    >
      <Symbol
        point={point.position}
        fill={color}
        strokeWidth={0}
        size={point.voteShare * 5}
      />
    </Handle>
  );
};
