import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from "./componets/Navbar"
import { Home } from './componets/Home';
import { SignUp } from './componets/SignUp';
import { LogIn } from './componets/LogIn';
import { Loader } from './componets/Loader';
import { useContext } from 'react';
import { LoaderContext } from './contexts/loader.context';

function App() {
  const { isLoading } = useContext(LoaderContext)
  return (
    <>
      <Navbar /> {/*navbar is always visible*/}
      {isLoading && <Loader />} {/*if isLoading is true then show loader*/}
      <Routes> 
        <Route exact path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
