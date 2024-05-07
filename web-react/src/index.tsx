import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FlaskTop from './views/FlaskTop';
import FlaskLogin from './views/FlaskLogin';
import FlaskHome from './views/FlaskHome';
import FlaskSettings from './views/FlaskSettings';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';

// TODO:
//   It uses deprecated store function.
//   So it has to change new store function.
const store = createStore(reducer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FlaskTop />} />    
          <Route path="/FlaskLogin" element={<FlaskLogin />} />    
          <Route path="/FlaskHome" element={<FlaskHome />} />    
          <Route path="/FlaskSettings" element={<FlaskSettings />} />   
          <Route path="*" element={<h1>Not Found</h1>} /> 
        </Routes>
      </BrowserRouter>
	  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
