import React, { useState } from 'react';
import { PlanarDataPoint } from '../store/selectors';
import { Chart, Point, createUseInterpolatedEffect, YAxis } from 'hypocube';
import { DataPoint } from './DataPoint';
import { getViewbox } from './utils';
import { TimelineOverlay } from './TimelineOverlay';
import { Label } from './Label';

interface Props {
  planarData: PlanarDataPoint[];
  highlighted: string;
  yAxisLabel: string;
  highlight: (key: string) => void;
  timelineData?: [string, number][];
}

const interpolateData = (prev: PlanarDataPoint[], next: PlanarDataPoint[]) => {
  return (progress: number): PlanarDataPoint[] => {
    const merged = next.map((nextPoint) => {
      const prevPoint = prev.find(
        (p) => p.compoundKey === nextPoint.compoundKey,
      );
      if (!prevPoint) {
        return nextPoint;
      }
      const dX = nextPoint.position[0] - prevPoint.position[0];
      const dY = nextPoint.position[1] - prevPoint.position[1];
      const position: Point = [
        prevPoint.position[0] + dX * progress,
        prevPoint.position[1] + dY * progress,
      ];
      return {
        ...nextPoint,
        position,
      };
    });

    return merged;
  };
};

const useInterpolatedEffect = createUseInterpolatedEffect(
  (prev: Props, next: Props) => {
    console.log(prev.planarData, next.planarData);
    if (prev.yAxisLabel !== next.yAxisLabel) {
      return (progress: number) => ({
        ...next,
        planarData: interpolateData(prev.planarData, next.planarData)(progress),
      });
    }
    return next;
  },
);

export const MainChart: React.FC<Props> = (props) => {
  const [hovered, setHovered] = useState('');

  const [
    { planarData, highlighted, yAxisLabel, highlight, timelineData },
    isAnimating,
  ] = useInterpolatedEffect(props);

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
    <div style={{ cursor: hovered ? 'pointer' : 'initial' }}>
      <Chart
        isCanvas={isAnimating}
        view={view}
        gutter={[0, 0, 30, 35]}
        maxWidth={912}
        height={400}
        chartStyle={{
          xAxisLabelPosition: 25,
          yAxisLabelPosition: -30,
        }}
        htmlLayer={
          false
            ? undefined
            : planarData.map((point) => ({
                position: point.position,
                render: (
                  <Label
                    point={point}
                    highlighted={highlighted}
                    isFaded={isFaded(point.compoundKey)}
                  />
                ),
              }))
        }
      >
        <YAxis intercept={view.xMin} axisLabel={yAxisLabel} />
        {planarData.map((point) => (
          <DataPoint
            key={point.compoundKey}
            point={point}
            isFaded={isFaded(point.compoundKey)}
            highlight={highlight}
            isHovered={hovered === point.compoundKey}
            setHovered={setHovered}
          />
        ))}
        <TimelineOverlay
          timelineData={timelineData}
          planarData={highlightedData}
          compoundKey={highlighted}
          view={view}
        />
      </Chart>
    </div>
  );
};
