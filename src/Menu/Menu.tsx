import './styles.scss';

import React from 'react';
import { IconChevronRight } from '../icons';
import { colorCache, MenuCountryItem } from '../store/selectors';

interface Props {
  menuData: MenuCountryItem[];
  toggleCountry: (country: string) => void;
  highlight: (key: string) => void;
  unhighlight: (key: string) => void;
}

export const Menu: React.FC<Props> = ({
  menuData,
  toggleCountry,
  highlight,
  unhighlight,
}) => {
  return (
    <div className="menu">
      <ul className="menu-list">
        {menuData.map((country) => (
          <li key={country.key}>
            <a
              className={`menu-list__country ${
                country.isOpen ? 'is-open' : ''
              }`}
              onClick={() => toggleCountry(country.key)}
              onPointerEnter={() => highlight(country.key)}
              onPointerLeave={() => unhighlight(country.key)}
            >
              <span>{country.label}</span>
              <i className="icon">
                <IconChevronRight />
              </i>
            </a>
            <ul>
              {country.parties.map((party) => (
                <li key={party.key}>
                  <a
                    onPointerEnter={() => highlight(party.key)}
                    onPointerLeave={() => unhighlight(party.key)}
                    className="menu-list__party"
                  >
                    <span>{party.label}</span>
                    <span
                      className="menu-list__party-color"
                      style={{ backgroundColor: colorCache.get(party.key) }}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
