import React from 'react';
import { colorCache, PlanarDataPoint } from '../store/selectors';
import {
  Chart,
  createViewboxFromData,
  LineSeries,
  XAxis,
  YAxis,
} from 'hypocube';
import { DataPoint } from './DataPoint';
import { scaleTime } from 'd3-scale';
import { getViewbox } from './getViewbox';
import { TimelineOverlay } from './TimelineOverlay';

interface Props {
  planarData: PlanarDataPoint[];
  highlighted: string;
  timelineData?: [string, number][];
}

export const MainChart: React.FC<Props> = ({
  planarData,
  highlighted,
  timelineData,
}) => {
  const view = getViewbox(planarData, timelineData);
  if (!view) {
    return null;
  }

  const highlightedData = planarData.find(
    (point) => point.compoundKey === highlighted,
  );

  const isFaded = (compoundKey: string) => {
    if (highlighted.split(':').length === 2) {
      return true;
    }

    if (!highlighted) {
      return false;
    }

    const [countryId] = compoundKey.split(':');
    if (highlighted === countryId) {
      return false;
    }

    return true;
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
      <YAxis intercept={view.xMin} axisLabel="Populism Index" />
      {planarData.map((point) => (
        <DataPoint
          key={point.compoundKey}
          point={point}
          isFaded={isFaded(point.compoundKey)}
        />
      ))}
      <TimelineOverlay
        timelineData={timelineData}
        planarData={highlightedData}
        compoundKey={highlighted}
        view={view}
      />
    </Chart>
  );
};
