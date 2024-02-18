// import logo from './logo.svg';
import './App.css';
import Haderimg from './components/headerimg';
import Router from './components/router';
import Sidebar from './components/sidebar';

function App() {
  return (
    <div className="App">
      <Router/>
      <Haderimg/>
      <div className='content'>
        <Sidebar/>
      </div>
    </div>
  );
}

export default App;
