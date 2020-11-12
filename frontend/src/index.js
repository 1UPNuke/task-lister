import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Header from './components/Header'
import Footer from './components/Footer'

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <main>
      <App/>
    </main>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);