import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL, API_KEY } from '../config';
import { initialDataError, initialDataOk } from './actions';
import { getInitialState, State } from './state';

export type Action = (state: State) => State;

export type Dispatch = (action: Action) => void;

export const useChartData = () => {
  const [state, setState] = useState<State>(getInitialState());

  const dispatch = useCallback((action: Action) => {
    setState(action);
  }, []);

  const request = (endpoint: string) => {
    return;
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}`,
      headers: {
        'ACCESS-KEY': API_KEY,
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          dispatch(initialDataError(res.status));
          return;
        }
        dispatch(initialDataOk(res.data));
      })
      .catch(() => {
        dispatch(initialDataError());
      });
  }, []);

  return {
    state,
    dispatch,
    request,
  };
};
