import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'
import AnimeService from './services/anime-service';
import { AnimeServiceProvider } from './components/anime-service-context';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';


const animeService = new AnimeService();

ReactDOM.render(
  <Provider store={store}>
    <AnimeServiceProvider value={animeService}>
      <Router>
        <App />
      </Router>
    </AnimeServiceProvider>
  </Provider>,
  document.getElementById('root')
);


