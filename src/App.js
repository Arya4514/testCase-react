
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar';
import Statics from './components/Statics';
import AddStatics from './components/Statics/AddStatics';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route exact path='/' element={<Statics />} />
          <Route exact path='/add-statics' element={<AddStatics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
