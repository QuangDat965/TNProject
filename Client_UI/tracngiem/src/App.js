
import './App.css';
import Router from './View/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'bootstrap';


function App() {
  return (
    <div className="App">
      <div className='header'>
        <a style={{textDecoration:'none'}} href='/'> <button color='#fff' className='btn'><p style={{fontWeight:600, color:'#fff'}}>Home</p></button></a>
      </div>
      <div className='body'>
        <Router/>
      </div>
      <div className='footer'>
      </div>
    </div>
  );
}

export default App;
