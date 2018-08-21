import React, { Component } from 'react';

import './app.css';
import Feed from './components/feed';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <h1>My Awesome Blog</h1>
        </header>
        <main>
          <Feed />
        </main>
      </div>
    );
  }
}

export default App;
