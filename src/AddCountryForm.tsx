import React, { useState } from 'react';

interface Props {
  countries: Array<{
    id: string;
    label: string;
  }>;
  handleAddCountry: (id: string) => void;
  isLoading: boolean;
}

export const AddCountryForm: React.FC<Props> = ({
  countries,
  handleAddCountry,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState('');

  const selectedCountry = countries.find(
    (item) => item.label.toLowerCase() === inputValue.toLowerCase(),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCountry) {
      return;
    }

    handleAddCountry(selectedCountry.id);
    setInputValue('');
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <label htmlFor="entry-country" className="is-sr-only">
            Add a country
          </label>
          <input
            className="input"
            type="text"
            placeholder="Add a country"
            id="enter-country"
            list="countries"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <datalist id="countries">
            {countries.map(({ id, label }) => (
              <option key={id} value={label} />
            ))}
          </datalist>
        </div>
        <div className="control">
          <button
            type="submit"
            className={`button is-info ${isLoading ? 'is-loading' : ''}`}
            disabled={!selectedCountry}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
