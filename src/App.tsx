import './App.css';
import QueryProvider from './components/queryProvider/QueryProvider';

import ApiWeather from './components/ApiWeather/ApiWeather';

function App() {
  return (
    <QueryProvider>
      <ApiWeather />
    </QueryProvider>
  );
}

export default App;
