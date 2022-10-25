import React, { useEffect, useRef } from 'react';
import { IconChevronRight, IconWorld } from '../icons';

interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
  requestClose: () => void;
  activeCountries: Array<{
    id: string;
    label: string;
  }>;
  handleHideCountry: (id: string) => void;
  addCountryForm: React.ReactElement;
}

export const MobileCountryMenu: React.FC<Props> = ({
  isOpen,
  toggleOpen,
  requestClose,
  activeCountries,
  handleHideCountry,
  addCountryForm,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Element)
      ) {
        requestClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [requestClose]);

  return (
    <div
      className={`dropdown is-right mobile-country-dropdown ${
        isOpen ? 'is-active' : ''
      }`}
      ref={wrapperRef}
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="mobile-dropdown-menu"
          aria-label="Add or remove countries"
          onClick={toggleOpen}
        >
          <span className="icon">
            <IconWorld />
          </span>
          <span className="icon is-small open-icon">
            <IconChevronRight />
          </span>
        </button>
      </div>
      <div
        className="dropdown-menu mobile-country-content"
        id="mobile-dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          <div className="dropdown-item">{addCountryForm}</div>
          <hr className="dropdown-divider" />
          {activeCountries.map((item) => (
            <div className="dropdown-item" key={item.id}>
              <button
                type="button"
                className="delete"
                onClick={() => handleHideCountry(item.id)}
              ></button>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
