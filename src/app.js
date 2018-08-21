import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './app.css';
import Feed from './components/feed';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <header>
            <h1>My Awesome Blog</h1>
          </header>
          <main>
            <Feed />
          </main>
        </div>
      </Provider>
    );
  }
}

export default App;
