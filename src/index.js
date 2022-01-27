import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import App from './App';
import Tutorial from './components/tutorial.component';
import TutorialList from './components/tutorials-list.component';
import AddTutorial from './components/add-tutorial.component';
import Home from './components/home.component';
import { Container } from 'reactstrap';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Container
      className='bg-light container-home'
      fluid
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tutorials" element={<TutorialList />} />
        <Route path="add" element={<AddTutorial/>} />
        <Route path="tutorials/:id" element={<Tutorial />} />
      </Routes>
    </Container>
    
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
