import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Pins from './pages/Pins'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/pins/all/" element={<Pins />} />
        </Routes>
      </Router>
      <Analytics />
    </div>
  )
}

export default App
