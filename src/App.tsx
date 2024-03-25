import './App.css';
import Navigation from './components/navigation/Navigation';
import WeatherToday from './components/weatherToday/WeatherToday';

function App() {
  return (
    <>
      <Navigation />
      <main>
        <WeatherToday />
      </main>
    </>
  );
}

export default App;
