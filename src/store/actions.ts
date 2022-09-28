import { Action } from './useChartData';
import update from 'immutability-helper';

export const initialDataOk =
  (data: any): Action =>
  (init) => {
    const { COUNTRIES, CAN, USA, GBR } = data;

    return update(init, {
      initialDataLoad: { $set: 200 },
      data: { $push: [CAN, USA, GBR] },
      countries: { $set: COUNTRIES },
    });
  };

export const initialDataError =
  (status?: number): Action =>
  (init) => {
    return update(init, {
      initialDataLoad: { $set: status || 'error' },
    });
  };
