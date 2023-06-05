import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {Search} from './Components/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Search/>
      </BrowserRouter>
    </div>
  );
}

export default App;