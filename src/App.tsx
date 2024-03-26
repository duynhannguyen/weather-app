import './App.css';
import Navigation from './components/navigation/Navigation';
import WeatherToday from './components/weatherToday/WeatherToday';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-container">
        <WeatherToday />
      </main>
    </div>
  );
}

export default App;
