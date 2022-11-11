import { Handle, Symbol } from 'hypocube';
import React from 'react';
import { PlanarDataPoint } from '../store/selectors';
import { colorFade as fade } from './utils';

interface Props {
  point: PlanarDataPoint;
  isFaded: boolean;
  highlight: (key: string) => void;
  isHovered: boolean;
  setHovered: (compoundKey: string) => void;
}

export const DataPoint: React.FC<Props> = ({
  point,
  isFaded,
  highlight,
  isHovered,
  setHovered,
}) => {
  const color = isFaded ? fade(point.baseColor) : point.baseColor;

  return (
    <Handle
      onPointerDown={() => highlight(point.compoundKey)}
      onPointerEnter={() => setHovered(point.compoundKey)}
      onPointerLeave={() => setHovered('')}
    >
      <Symbol
        point={point.position}
        fill={color}
        strokeWidth={isHovered ? 6 : 0}
        stroke="#ccc"
        size={Math.sqrt(point.voteShare) * 25}
      />
    </Handle>
  );
};
