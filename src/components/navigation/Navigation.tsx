import './Navigation.css';
import { MdOutlineMyLocation, MdOutlineSearch } from 'react-icons/md';
const Navigation = () => {
  return (
    <nav className="navigation-wrap">
      <div> City Weather</div>
      <div className="location-section">
        <MdOutlineMyLocation />
        <div>Hồ Chí Minh</div>
        <form className="search-section">
          <input
            className="search-input"
            placeholder="Search location..."
            type="text"
          />
          <div className="search-icon">
            <MdOutlineSearch className="icon" />
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navigation;
