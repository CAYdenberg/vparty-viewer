export const BELIEF_KEYS = {
  v2xpa_popul: 'Populism Index',
  v2xpa_antiplural: 'Anti-Pluralism Index',
  v2paanteli: 'Anti-elitism',
  v2papeople: 'People-centrism',
  v2paopresp: 'Political opponents',
  v2paplur: 'Political pluralism',
  v2paminor: 'Minority rights',
  v2paviol: 'Rejection of politcal violence',
  v2paimmig: 'Immigration',
  v2palgbt: 'LGBT social equality',
  v2paculsup: 'Cultural superiority',
  v2parelig: 'Religious principles',
  v2pagender: 'Gender equality',
  v2pawomlab: 'Working women',
  v2pariglef: 'Economic left-right scale',
  v2pawelf: 'Welfare',
};

export type BeliefKeyT = typeof BELIEF_KEYS;

type Beliefs = {
  [property in keyof BeliefKeyT]: {
    label: string;
    value: number;
    low: number;
    high: number;
  };
};

interface PartyElection extends Beliefs {
  date: string;
  voteShare: number;
}

export interface State {
  initialDataLoad: number | 'loading' | 'error';

  apiLoad: Record<string, number | 'loading' | 'error'>;

  data: Array<{
    id: string;
    label: string;
    parties: Array<{
      id: string;
      label: string;
      elections: Array<PartyElection>;
    }>;
    lastElection: {
      date: string;
      voteShare: Array<{
        party: string;
        voteShare: number;
      }>;
    };
  }>;

  countries: Array<{
    id: string;
    label: string;
  }>;

  ux: {
    collapsedCountries: string[];
    highlighed: string[];
    yAxis: keyof BeliefKeyT;
  };
}

export const getInitialState = (): State => ({
  initialDataLoad: 'loading',
  apiLoad: {},
  data: [],
  countries: [],
  ux: {
    collapsedCountries: [],
    highlighed: [],
    yAxis: 'v2xpa_popul',
  },
});
