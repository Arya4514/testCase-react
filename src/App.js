
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar';
import Statics from './components/Statics';
import AddStatics from './components/Statics/AddStatics';
import EnhancedTable from './components/Table';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <ResponsiveAppBar />
          &nbsp;
          <Routes>
            <Route exact path='/' element={<Statics />} />
            <Route exact path='/add-statics' element={<AddStatics />} />
            <Route exact path='/v1' element={<EnhancedTable />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
