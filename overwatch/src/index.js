import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // React Router 관련 모듈 import
import Pick from './pages/Pick'
import Store from './pages/Store'
import Gift from './pages/Gift'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes>
        {/* 기본 경로 */}
        <Route path="/" element={<App />} />
        {/* 접속 버튼으로 이동할 경로 */}
        <Route path="/pick" element={<Pick />} />
        <Route path="/store" element={<Store />} />
        <Route path="/gift" element={<Gift />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
