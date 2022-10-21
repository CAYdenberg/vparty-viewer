import React from 'react';
import { PartyDataPoint } from '../store/selectors';
import { Chart, createViewboxFromData, XAxis, YAxis } from 'hypocube';
import { DataPoint } from './DataPoint';

interface Props {
  chartData: PartyDataPoint[];
  highlighted: string[];
}

export const MainChart: React.FC<Props> = ({ chartData, highlighted }) => {
  const points = chartData.map((party) => party.position);
  const view = createViewboxFromData(points)?.zoom(0.85);
  if (!view || !points.length) {
    return null;
  }

  const isFaded = (compoundKey: string) => {
    if (!highlighted.length) {
      return false;
    }

    if (highlighted.includes(compoundKey)) {
      return false;
    }

    const [countryId] = compoundKey.split(':');
    if (highlighted.includes(countryId)) {
      return false;
    }

    return true;
  };

  const showHistory = (compoundKey: string) => {
    return highlighted.includes(compoundKey);
  };

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
        <DataPoint
          key={point.compoundKey}
          point={point}
          isFaded={isFaded(point.compoundKey)}
          showHistory={showHistory(point.compoundKey)}
        />
      ))}
    </Chart>
  );
};
