// import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Haderimg from './components/headerimg';
import Router from './components/router';
import Sidebar from './components/sidebar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const navigate=useNavigate()
  let active=useSelector((data)=>{return data.active})
  useEffect(()=>{
    if(active===1){
      navigate('/')
    }
  })
  return (
    <div className="App">
      <Haderimg/>
      <div className='content'>
        <Sidebar/>
        <Router/>
      </div>
      
    </div>
  );
}

export default App;
