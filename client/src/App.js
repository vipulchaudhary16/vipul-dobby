import { Route, Routes } from 'react-router-dom';
import './App.css';
import {Navbar} from "./componets/Navbar"
import { Home } from './componets/Home';
import { SignUp } from './componets/SignUp';
import { LogIn } from './componets/LogIn';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
