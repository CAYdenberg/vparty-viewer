import { Action } from './useChartData';
import update from 'immutability-helper';
import { BeliefKeyT } from './state';

export const initialDataOk =
  (
    data: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Action =>
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

export const reqStart =
  (id: string): Action =>
  (init) => {
    return update(init, {
      apiLoad: (val) => ({
        ...val,
        [id]: 'loading',
      }),
    });
  };

export const reqOk =
  (
    id: string,
    data: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Action =>
  (init) => {
    return update(init, {
      apiLoad: (val) => ({
        ...val,
        [id]: 200,
      }),
      data: (val) => [data, ...val],
      ux: {
        collapsedCountries: (val) => val.filter((item) => item !== id),
      },
    });
  };

export const reqError =
  (id: string, status?: number): Action =>
  (init) => {
    return update(init, {
      apiLoad: (val) => ({
        ...val,
        [id]: status || 'error',
      }),
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
        highlighted: { $set: key },
      },
    });
  };

export const unhighlight = (): Action => (init) => {
  return update(init, {
    ux: {
      highlighted: { $set: '' },
    },
  });
};

export const setYAxis =
  (yAxis: keyof BeliefKeyT): Action =>
  (init) => {
    return update(init, {
      ux: {
        yAxis: { $set: yAxis },
      },
    });
  };

export const toggleMobileMenu = (): Action => (init) => {
  return update(init, {
    ux: {
      mobileMenu: (val) => !val,
    },
  });
};

export const closeMobileMenu = (): Action => (init) => {
  return update(init, {
    ux: {
      mobileMenu: { $set: false },
    },
  });
};
