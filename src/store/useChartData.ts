import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL, API_KEY } from '../config';
import { initialDataError, initialDataOk } from './actions';
import { getInitialState, State } from './state';
import * as actions from './actions';

export type Action = (state: State) => State;

export type Dispatch = (action: Action) => void;

export const useChartData = () => {
  const [state, setState] = useState<State>(getInitialState());

  const dispatch = useCallback((action: Action) => {
    setState(action);
  }, []);

  const request = useCallback(
    (endpoint: string) => {
      dispatch(actions.reqStart(endpoint));

      axios({
        method: 'GET',
        url: `${API_BASE_URL}/${endpoint}`,
        headers: {
          'ACCESS-KEY': API_KEY,
        },
      })
        .then((res) => {
          if (res.status >= 400) {
            dispatch(actions.reqError(endpoint, res.status));
            return;
          }
          dispatch(actions.reqOk(endpoint, res.data));
        })
        .catch(() => {
          dispatch(initialDataError());
        });
    },
    [dispatch],
  );

  // bootstrap effect. Run once no matter what.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    dispatch,
    request,
  };
};
