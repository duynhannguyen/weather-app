import {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import "./Navigation.css";
import { MdOutlineMyLocation, MdOutlineSearch } from "react-icons/md";
import Suggestion from "../suggestion/Suggestion";
import { SuggestionElement } from "../ApiWeather/ApiWeather";

type NavigationProps = {
  onHandleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
  suggestionList: SuggestionElement[];
  showSuggestion: boolean;
  isLoading: boolean;
};

const Navigation = ({
  setSearchValue,
  onHandleChange,
  searchValue,
  suggestionList,
  showSuggestion,
  isLoading,
}: NavigationProps) => {
  const [inputValue, setInputValue] = useState("");
  const [currentCity, setCurrentCity] = useState("Hồ Chí Minh");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(inputValue);
    setCurrentCity(inputValue);
    setInputValue("");
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
            value={searchValue}
            onChange={onHandleChange}
          />
          <button
            disabled={inputValue === ""}
            type="submit"
            className="search-icon"
          >
            <MdOutlineSearch className="icon" />
          </button>
          {showSuggestion && (
            <Suggestion suggestionList={suggestionList} isLoading={isLoading} />
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navigation;
