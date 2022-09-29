import { BeliefKeyT, State } from './state';

export interface PartyDataPoint {
  compoundKey: string;
  position: [number, number];
  voteShare: number;
  history: Array<{
    compoundKey: string;
    voteShare: number;
    position: [number, number];
  }>;
}

export const getChartData =
  (yAxis: keyof BeliefKeyT) =>
  (state: State): PartyDataPoint[] => {
    return state.data.reduce((acc, country) => {
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

          return { compoundKey, position, history, voteShare: party.voteShare };
        })
        .filter(Boolean) as PartyDataPoint[];

      return acc.concat(extantParties);
    }, [] as PartyDataPoint[]);
  };

export interface MenuCountryItem {
  label: string;
  key: string;
  parties: Array<{
    key: string;
    label: string;
  }>;
}

export const getMenuData = (state: State) => {
  return state.data.map((country) => ({
    label: country.label,
    key: country.id,
    parties: country.parties.map((party) => ({
      key: `${country.id}:${party.id}`,
      label: party.label,
    })),
  }));
};
