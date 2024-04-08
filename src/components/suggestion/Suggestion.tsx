import { SuggestionElement } from "../ApiWeather/ApiWeather";
import Loading from "../loading/Loading";
import "./Suggestion.css";

type SuggestionProps = {
  suggestionList: SuggestionElement[];
  isLoading: boolean;
};

const Suggestion = ({ suggestionList, isLoading }: SuggestionProps) => {
  return (
    <div className="suggestion-wrap">
      {isLoading && (
        <div className="loading">
          {" "}
          <Loading />{" "}
        </div>
      )}
      {suggestionList === undefined && <p>No suggestions</p>}
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
