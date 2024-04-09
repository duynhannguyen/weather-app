import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SuggestionElement } from "../ApiWeather/ApiWeather";
import Loading from "../loading/Loading";
import "./Suggestion.css";

type SuggestionProps = {
  suggestionList: SuggestionElement[];
  isLoading: boolean;
  setSuggestClose: any;
  apiError: string;
};

const Suggestion = ({
  suggestionList,
  isLoading,
  setSuggestClose,
  apiError,
}: SuggestionProps) => {
  const suggestRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let click = (e: MouseEvent) => {
      if (!suggestRef.current?.contains(e.target as Node)) {
        setSuggestClose(false);
      }
    };
    document.addEventListener("mousedown", click);
    return () => {
      document.removeEventListener("mousedown", click);
    };
  });

  return (
    <div ref={suggestRef} className="suggestion-wrap">
      {isLoading && (
        <div className="loading">
          {" "}
          <Loading />{" "}
        </div>
      )}
      {suggestionList.length === 0 && !isLoading && !apiError && (
        <p>No suggestions</p>
      )}
      {apiError && <p style={{ color: "red" }}> {apiError} </p>}
      {suggestionList.map((item, i) => (
        <div className="suggest-child" key={i}>
          {" "}
          {item.name}{" "}
        </div>
      ))}
    </div>
  );
};

export default Suggestion;
