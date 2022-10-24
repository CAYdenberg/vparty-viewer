import { COMMON_PARTY_COLORS } from '../config';
import { BeliefKeyT, State } from './state';
import { random as randomColor } from 'tinycolor2';

export interface PartyDataPoint {
  compoundKey: string;
  position: [number, number];
  voteShare: number;
  baseColor: string;
  history: Array<{
    compoundKey: string;
    voteShare: number;
    position: [number, number];
  }>;
}

class ColorCache {
  private colors: Record<string, string>;

  constructor() {
    this.colors = {};
  }

  public get(id: string) {
    if (this.colors[id]) {
      return this.colors[id];
    }

    this.colors[id] = randomColor().toHslString();
    return this.colors[id];
  }
}
const colorCache = new ColorCache();

export const getChartData =
  (yAxis: keyof BeliefKeyT) =>
  (state: State): PartyDataPoint[] => {
    return state.data.reduce((acc, country) => {
      if (state.ux.collapsedCountries.includes(country.id)) {
        return acc;
      }

      const lastElection = country.lastElection.date;
      const extantParties = country.lastElection.voteShare
        .map((party) => {
          const compoundKey = `${country.id}:${party.party}`;
          const partyFullData = country.parties.find(
            (p) => p.id === party.party,
          );
          const currentPartyElection = partyFullData?.elections.find(
            (e) => e.date === lastElection,
          );
          if (!currentPartyElection) return null;

          const position = [
            currentPartyElection.v2pariglef.value,
            currentPartyElection[yAxis].value,
          ] as [number, number];

          // already would have returned if partyFullData is undefined
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const history = partyFullData!.elections.map((e) => ({
            compoundKey: `${country.id}:${party.party}:${e.date}`,
            voteShare: e.voteShare,
            position: [e.v2pariglef.value, e[yAxis].value] as [number, number],
          }));

          const baseColor =
            COMMON_PARTY_COLORS[compoundKey] || colorCache.get(compoundKey);

          return {
            compoundKey,
            position,
            history,
            voteShare: party.voteShare,
            baseColor,
          };
        })
        .filter(Boolean) as PartyDataPoint[];

      return acc.concat(extantParties);
    }, [] as PartyDataPoint[]);
  };

export interface MenuCountryItem {
  label: string;
  key: string;
  isOpen: boolean;
  parties: Array<{
    key: string;
    label: string;
  }>;
}

export const getMenuData = (state: State): MenuCountryItem[] => {
  return state.data.map((country) => ({
    label: country.label,
    key: country.id,
    isOpen: !state.ux.collapsedCountries.includes(country.id),
    parties: country.parties
      .filter((party) => {
        return !!country.lastElection.voteShare.find(
          (item) => item.party === party.id,
        );
      })
      .map((party) => ({
        key: `${country.id}:${party.id}`,
        label: party.label,
      })),
  }));
};

export const isLoading = (state: State): boolean => {
  return (
    state.initialDataLoad === 'loading' ||
    !!Object.keys(state.apiLoad).find((key) => state.apiLoad[key] === 'loading')
  );
};
