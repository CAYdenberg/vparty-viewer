import React from 'react';
import { PlanarDataPoint } from '../store/selectors';
import { colorFade } from './utils';

interface Props {
  point: PlanarDataPoint;
  highlighted: string;
  isFaded: boolean;
}

export const Label: React.FC<Props> = ({ point, highlighted, isFaded }) => {
  const classes = [
    'chart-label',
    highlighted.split(':')[0] === point.compoundKey.split(':')[0]
      ? 'country-highlighted'
      : '',
    isFaded ? 'is-faded' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={{
        color: isFaded ? colorFade(point.baseColor) : point.baseColor,
        maxWidth: 250,
        marginTop: point.voteShare * -0.5,
        marginLeft: point.voteShare * 0.5 + 8,
      }}
    >
      {point.partyName}
    </div>
  );
};
