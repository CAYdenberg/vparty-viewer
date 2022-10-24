import { createViewboxFromData, Viewbox } from 'hypocube';
import { PlanarDataPoint } from '../store/selectors';

export const getViewbox = (
  planarData: PlanarDataPoint[],
  timelineData?: [string, number][],
): Viewbox | null => {
  const points = planarData.map((party) => party.position);
  const baseView = createViewboxFromData(points)?.zoom(0.85);
  if (!baseView || !points.length) {
    return null;
  }

  if (!timelineData) {
    return baseView;
  }

  let { yMin, yMax } = baseView;
  timelineData.forEach(([, yValue]) => {
    if (yValue < yMin) {
      yMin = yValue;
    }
    if (yValue > yMax) {
      yMax = yValue;
    }
  });

  return baseView
    .setEdges({ yMax, yMin })
    .zoom(0.85)
    .setEdges({ xMin: baseView.xMin, xMax: baseView.xMax });
};
