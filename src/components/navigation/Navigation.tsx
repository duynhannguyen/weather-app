import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import './Navigation.css';
import { MdOutlineMyLocation, MdOutlineSearch } from 'react-icons/md';

type NavigationProps = {
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const Navigation = ({ setSearchValue }: NavigationProps) => {
  const [inputValue, setInputValue] = useState('');
  const [currentCity, setCurrentCity] = useState('Hồ Chí Minh');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(inputValue);
    setCurrentCity(inputValue);
    setInputValue('');
  };

  return (
    <nav className="navigation-wrap">
      <div> City Weather</div>
      <div className="location-section">
        <MdOutlineMyLocation />
        <div>{currentCity}</div>
        <form onSubmit={handleSubmit} className="search-section">
          <input
            className="search-input"
            placeholder="Search location..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={inputValue === ''}
            type="submit"
            className="search-icon"
          >
            <MdOutlineSearch className="icon" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navigation;
