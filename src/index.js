import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './reset.scss';
import './index.scss';
import Header from './components/header'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
