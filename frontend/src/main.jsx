import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';


const rootElement = document.getElementById('root');

//Verifica se o elemento existe
if(rootElement){
const root = ReactDOM.createRoot(rootElement); //cria a raiz do React 18

  root.render(
    <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </React.StrictMode>,
    
  );
}


