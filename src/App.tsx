import './App.css';
import MainSection from './components/mainSection/MainSection';
import Navigation from './components/navigation/Navigation';
import QueryProvider from './components/queryProvider/QueryProvider';

import WeatherDetail from './components/weatherDetail/WeatherDetail';
import WeatherToday from './components/weatherToday/WeatherToday';

function App() {
  return (
    <QueryProvider>
      <div className="app-container">
        <Navigation />
        <MainSection>
          <WeatherToday />
          <WeatherDetail />
        </MainSection>
      </div>
    </QueryProvider>
  );
}

export default App;
