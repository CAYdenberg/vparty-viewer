import React from 'react';
import { IconChevronRight } from '../icons';
import { MenuCountryItem } from '../store/selectors';

interface Props {
  menuData: MenuCountryItem[];
}

export const Menu: React.FC<Props> = ({ menuData }) => {
  return (
    <div className="menu">
      <ul className="menu-list">
        {menuData.map((country) => (
          <li key={country.key}>
            <a>
              <i className="icon">
                <IconChevronRight />
              </i>
              <span>{country.label}</span>
            </a>
            <ul>
              {country.parties.map((party) => (
                <li key={party.key}>
                  <a>{party.label}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
