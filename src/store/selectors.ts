import { COMMON_PARTY_COLORS, VOTE_SHARE_MIN } from '../config';
import { BeliefKeyT, State } from './state';
import { random as randomColor } from 'tinycolor2';
import { YAxis } from 'hypocube';

export interface PlanarDataPoint {
  compoundKey: string;
  partyName: string;
  position: [number, number];
  voteShare: number;
  baseColor: string;
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

    this.colors[id] = COMMON_PARTY_COLORS[id] || randomColor().toHslString();
    return this.colors[id];
  }
}
export const colorCache = new ColorCache();

export const getPlanarData =
  (yAxis: keyof BeliefKeyT) =>
  (state: State): PlanarDataPoint[] => {
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

          const baseColor = colorCache.get(compoundKey);

          return {
            compoundKey,
            position,
            partyName: partyFullData?.label,
            voteShare: party.voteShare,
            baseColor,
          };
        })
        .filter(Boolean) as PlanarDataPoint[];

      return acc.concat(extantParties);
    }, [] as PlanarDataPoint[]);
  };

export const getTimelineData =
  (yAxis: keyof BeliefKeyT, compoundId?: string) => (state: State) => {
    if (!compoundId) return null;

    const [countryId, partyId] = compoundId.split(':');
    if (!partyId) return null;

    const country = state.data.find((country) => country.id === countryId);
    if (!country) return null;

    const party = country.parties.find((party) => party.id === partyId);
    if (!party) return null;

    return party.elections.map(
      (election) => [election.date, election[yAxis].value] as [string, number],
    );
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
        const voteShare = country.lastElection.voteShare.find(
          (item) => item.party === party.id,
        );
        return voteShare && voteShare.voteShare > VOTE_SHARE_MIN;
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
