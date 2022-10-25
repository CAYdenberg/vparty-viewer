import React from 'react';
import { BeliefKeyT, BELIEF_KEYS, getBeliefLabel } from './store/state';

interface Props {
  yAxis: keyof BeliefKeyT;
  setYAxis: (next: keyof BeliefKeyT) => void;
}

export const ChartControlForm: React.FC<Props> = ({ yAxis, setYAxis }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (Object.keys(BELIEF_KEYS).includes(val)) {
      setYAxis(val as keyof BeliefKeyT);
    }
  };

  return (
    <form>
      <div className="select">
        <select value={yAxis} onChange={handleChange}>
          {Object.keys(BELIEF_KEYS).map((key) => (
            <option value={key} key={key}>
              {getBeliefLabel(key)}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
