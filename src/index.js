import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.component';
import AppProvider from './App.context';

const MainApp = () => <AppProvider><App/></AppProvider>
ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);

