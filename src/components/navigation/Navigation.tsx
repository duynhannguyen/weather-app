import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction } from 'react';
import './Navigation.css';
import { MdOutlineMyLocation, MdOutlineSearch } from 'react-icons/md';
import Suggestion from '../suggestion/Suggestion';
import { SuggestionElement } from '../ApiWeather/ApiWeather';
import axios from 'axios';
import iso from 'iso-3166-1';

type NavigationProps = {
  onHandleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
  suggestionList: SuggestionElement[];
  showSuggestion: boolean;
  setShowSuggestions: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  currentCity: string;
  setFetchResult: Dispatch<SetStateAction<SuggestionElement>>;
  setApiError: Dispatch<SetStateAction<string>>;
  apiError: string;
  country: string;
};

const Navigation = ({
  setSearchValue,
  onHandleChange,
  searchValue,
  suggestionList,
  showSuggestion,
  isLoading,
  setShowSuggestions,
  currentCity,
  setIsLoading,
  setFetchResult,
  setApiError,
  apiError,
  country,
}: NavigationProps) => {
  const countryFullName = iso.whereAlpha2(country);
  let countryFullNameStr: string = '';
  if (countryFullName !== undefined) {
    countryFullNameStr = countryFullName.country;
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setShowSuggestions(false);
      const fetchWeather = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&cnt=56&units=metric`
      );
      console.log('fetchWeather', fetchWeather?.data);
      setFetchResult({
        lat: fetchWeather?.data.city.coord.lat,
        lon: fetchWeather?.data.city.coord.lon,
        name: fetchWeather?.data.city.name,
        country: fetchWeather?.data.city.country,
      });
    } catch (error: any) {
      setApiError(error?.response?.data?.message);
    } finally {
      setSearchValue('');
      setIsLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        const { latitude, longitude } = location.coords;
        setFetchResult({
          lat: String(latitude),
          lon: String(longitude),
          name: '',
          country: '',
        });
      });
    }
  };

  return (
    <nav className="navigation-wrap">
      <div> City Weather</div>
      <div className="location-section">
        <div className="location-icon" onClick={handleCurrentLocation}>
          <MdOutlineMyLocation title="Your Current Location" />
        </div>
        <div>
          {currentCity}, {countryFullNameStr}{' '}
        </div>
        <form onSubmit={handleSubmit} className="search-section">
          <input
            className="search-input"
            placeholder="Search location..."
            type="text"
            name="search-bar"
            value={searchValue}
            onChange={onHandleChange}
          />
          <button
            disabled={searchValue === ''}
            type="submit"
            className="search-icon"
          >
            <MdOutlineSearch className="icon" />
          </button>
          {showSuggestion || apiError ? (
            <Suggestion
              suggestionList={suggestionList}
              isLoading={isLoading}
              setSuggestClose={setShowSuggestions}
              apiError={apiError}
              setFetchResult={setFetchResult}
              setShowSuggestions={setShowSuggestions}
              setSearchValue={setSearchValue}
            />
          ) : null}
        </form>
      </div>
    </nav>
  );
};

export default Navigation;
