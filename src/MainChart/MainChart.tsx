import React from 'react';
import { PartyDataPoint } from '../store/selectors';
import {
  Chart,
  createViewboxFromData,
  Handle,
  Symbol,
  XAxis,
  YAxis,
} from 'hypocube';
import { COMMON_PARTY_COLORS } from '../config';

interface Props {
  chartData: PartyDataPoint[];
}

export const MainChart: React.FC<Props> = ({ chartData }) => {
  const points = chartData.map((party) => party.position);
  const view = createViewboxFromData(points)?.zoom(0.85);
  if (!view || !points.length) {
    return null;
  }

  return (
    <Chart
      // isCanvas={true}
      view={view}
      gutter={[0, 0, 30, 35]}
      maxWidth={912}
      height={400}
      chartStyle={{
        xAxisLabelPosition: 25,
        yAxisLabelPosition: -30,
      }}
    >
      <XAxis intercept={view.yMin} axisLabel="Economic left-right" />
      <YAxis intercept={view.xMin} axisLabel="Populism Index" />
      {chartData.map((point) => (
        <React.Fragment key={point.compoundKey}>
          <Handle onPointerDown={() => console.log(point.compoundKey)}>
            <Symbol
              point={point.position}
              fill={COMMON_PARTY_COLORS[point.compoundKey] || '#333'}
              strokeWidth={0}
              size={point.voteShare * 5}
            />
          </Handle>
        </React.Fragment>
      ))}
    </Chart>
  );
};
