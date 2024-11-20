import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // React Router 관련 모듈 import
import Pick from './pages/Pick'
import Store from './pages/Store'
import Gift from './pages/Gift'
import Hero from './pages/Hero'
import Log from './pages/Log'
import { CoinProvider } from "./components/CoinContext"; // CoinContext 추가

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CoinProvider>
   <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pick" element={<Pick />} />
        <Route path="/store/:heroId" element={<Store />} />
        <Route path="/gift/:heroId" element={<Gift />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/log" element={<Log/>}/>
      </Routes>
    </BrowserRouter></CoinProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
