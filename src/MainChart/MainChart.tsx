import React, { useRef, useState } from 'react';
import { PlanarDataPoint } from '../store/selectors';
import {
  Chart,
  Point,
  createUseInterpolatedEffect,
  YAxis,
  list,
  Grid,
} from 'hypocube';
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
  overlayOpacity: number;
}

const GRID = list(15, (i) => i - 7);
const GRID_DEC = list(10, (i) => i * 0.1);

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

const useInterpolatedEffect = createUseInterpolatedEffect<Props>(
  (prev, next) => {
    if (prev.yAxisLabel !== next.yAxisLabel) {
      return (progress: number) => ({
        ...next,
        planarData: interpolateData(prev.planarData, next.planarData)(progress),
      });
    }
    if (prev.highlighted !== next.highlighted) {
      return (progress: number) => ({
        ...next,
        overlayOpacity: progress,
      });
    }
    return next;
  },
);

export const MainChart: React.FC<Props> = (props) => {
  const [
    { planarData, yAxisLabel, overlayOpacity, timelineData },
    isAnimating,
  ] = useInterpolatedEffect(props);

  return (
    <AnimatedChart
      {...props}
      planarData={planarData}
      timelineData={timelineData}
      yAxisLabel={yAxisLabel}
      isAnimating={isAnimating}
      overlayOpacity={overlayOpacity}
    />
  );
};

MainChart.defaultProps = {
  overlayOpacity: 1,
};

interface MainChartAnimatedProps extends Props {
  overlayOpacity: number;
  isAnimating: boolean;
}

const AnimatedChart: React.FC<MainChartAnimatedProps> = ({
  planarData,
  highlighted,
  yAxisLabel,
  highlight,
  timelineData,
  isAnimating,
  overlayOpacity,
}) => {
  const [hovered, setHovered] = useState('');

  const basicView = getViewbox(planarData, timelineData);
  const lastStableView = useRef(basicView);

  if (!basicView) {
    return null;
  }

  const view =
    isAnimating && lastStableView.current
      ? lastStableView.current.interpolate(basicView, overlayOpacity)
      : basicView;

  if (!isAnimating) {
    lastStableView.current = basicView;
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
          htmlLayerPointerEvents: false,
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
        <Grid
          xLines={GRID}
          yLines={
            ['Populism Index', 'Anti-Pluralism Index'].includes(yAxisLabel)
              ? GRID_DEC
              : GRID
          }
        />
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
          opacity={overlayOpacity}
        />
      </Chart>
    </div>
  );
};
