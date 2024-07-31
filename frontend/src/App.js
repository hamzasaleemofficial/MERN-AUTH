
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import Home from './components/Home';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';




function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element}) => {
      return isAuthenticated? element : <Navigate to='/login'/>
  }
  return (
    <div className="App">
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path='/home' element={<PrivateRoute element={<Home />} />} />
    </Routes>
      
    </div>
  );
}

export default App;
