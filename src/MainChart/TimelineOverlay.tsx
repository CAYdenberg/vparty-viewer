import { scaleTime } from 'd3-scale';
import { LineSeries, Viewbox, XAxis } from 'hypocube';
import React from 'react';
import { colorCache, PlanarDataPoint } from '../store/selectors';

interface Props {
  timelineData?: [string, number][];
  planarData?: PlanarDataPoint;
  compoundKey: string;
  view: Viewbox;
}

const getXScaler = scaleTime().domain([new Date(1970, 0, 0), Date.now()]);

const tickLabels: string[] = ['1970', '1980', '1990', '2000', '2010', '2020'];

export const TimelineOverlay: React.FC<Props> = ({
  timelineData,
  compoundKey,
  planarData,
  view,
}) => {
  if (!timelineData || !planarData) {
    return <XAxis intercept={view.yMin} axisLabel="Economic left-right" />;
  }
  const xScaler = getXScaler.range(view.x);

  const ticks = tickLabels.map(
    (tickLabel) =>
      [xScaler(new Date(tickLabel)), tickLabel] as [number, string],
  );

  const color = colorCache.get(compoundKey);

  return (
    <React.Fragment>
      <XAxis
        intercept={planarData.position[1]}
        tickPositions={ticks}
        axisLabel={planarData.partyName || ''}
        chartStyle={{
          axisColor: planarData.baseColor,
          xAxisLabelPosition: -10,
        }}
      />
      <LineSeries
        data={timelineData.map(([x, y]) => [xScaler(new Date(x)), y])}
        chartStyle={{
          dataLineStroke: color,
          dataLineStrokeWidth: 2,
          dataLineDashType: 'dashed',
          dataPointFill: color,
          dataPointSize: 7,
          dataPointSymbol: 'circle',
        }}
      />
    </React.Fragment>
  );
};
