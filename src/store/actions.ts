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

export const toggleCountry =
  (country: string): Action =>
  (init) => {
    return update(init, {
      ux: {
        collapsedCountries: (val) => {
          const exists = val.includes(country);
          return exists
            ? val.filter((item) => item !== country)
            : val.concat(country);
        },
      },
    });
  };

export const highlight =
  (key: string): Action =>
  (init) => {
    return update(init, {
      ux: {
        highlighted: (val) => val.concat(key),
      },
    });
  };

export const unhighlight =
  (key?: string): Action =>
  (init) => {
    return update(init, {
      ux: {
        highlighted: (val) => (key ? val.filter((item) => item !== key) : []),
      },
    });
  };
