import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { SuggestionElement } from '../ApiWeather/ApiWeather';
import Loading from '../loading/Loading';
import './Suggestion.css';

type SuggestionProps = {
  suggestionList: SuggestionElement[];
  isLoading: boolean;
  setSuggestClose: Dispatch<SetStateAction<boolean>>;
  apiError: string;
  setFetchResult: Dispatch<SetStateAction<SuggestionElement>>;
  setShowSuggestions: Dispatch<SetStateAction<boolean>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const Suggestion = ({
  suggestionList,
  isLoading,
  setSuggestClose,
  apiError,
  setFetchResult,
  setShowSuggestions,
  setSearchValue,
}: SuggestionProps) => {
  const suggestRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (!suggestRef.current?.contains(e.target as Node)) {
        setSuggestClose(false);
      }
    };
    document.addEventListener('mousedown', click);
    return () => {
      document.removeEventListener('mousedown', click);
    };
  });

  return (
    <div ref={suggestRef} className="suggestion-wrap">
      {isLoading && (
        <div className="loading">
          {' '}
          <Loading />{' '}
        </div>
      )}
      {suggestionList.length === 0 && !isLoading && !apiError && (
        <p>No suggestions</p>
      )}
      {apiError && <p style={{ color: 'red' }}> {apiError} </p>}
      {suggestionList.map((item, i) => (
        <div
          className="suggest-child"
          key={i}
          onClick={() => {
            setFetchResult({
              lat: item.lat,
              lon: item.lon,
              name: item.name,
              country: item.country,
            });
            setShowSuggestions(false);
            setSearchValue('');
          }}
        >
          {' '}
          {item.name}, {item.country}
        </div>
      ))}
    </div>
  );
};

export default Suggestion;
