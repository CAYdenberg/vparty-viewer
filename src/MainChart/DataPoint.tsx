import { Handle, LineSeries, Symbol, Text } from 'hypocube';
import React from 'react';
import { PartyDataPoint } from '../store/selectors';
import tinycolor from 'tinycolor2';

interface Props {
  point: PartyDataPoint;
  isFaded: boolean;
  showHistory: boolean;
}

const fade = (baseColor: string) => {
  return tinycolor(baseColor).desaturate(80).setAlpha(0.2).toHslString();
};

export const DataPoint: React.FC<Props> = ({ point, isFaded, showHistory }) => {
  const color = isFaded ? fade(point.baseColor) : point.baseColor;

  const historyLabels = (() => {
    if (!showHistory) {
      return [];
    }
    return point.history.map(({ compoundKey, position }, i) => {
      const date = compoundKey.split(':')[2];
      const year = date.split('-')[0];
      const visible = !!year && (i === 0 || i === point.history.length - 1);
      return {
        label: visible ? year : '',
        position: position,
        key: compoundKey,
      };
    });
  })();

  return (
    <React.Fragment key={point.compoundKey}>
      <Handle onPointerDown={() => console.log(point.compoundKey)}>
        <Symbol
          point={point.position}
          fill={color}
          strokeWidth={0}
          size={point.voteShare * 5}
        />
      </Handle>
      {showHistory && (
        <React.Fragment>
          <LineSeries
            data={point.history.map((point) => point.position)}
            chartStyle={{
              dataLineStroke: point.baseColor,
              dataLineStrokeWidth: 2,
            }}
          />
          {historyLabels.map((point) => (
            <Text
              key={point.key}
              position={point.position}
              text={point.label}
            />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
