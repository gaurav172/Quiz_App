import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css';
import Sports from './Sports';
import Got from './Got';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Play extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Play Quizzes</h1>
        </header>
        <h4><Link to={'/Sports'}>Sports Quiz</Link></h4>
        <h4><Link to={'/Got'}>Game of Thrones Quiz</Link></h4>
      </div>
    );
  }
}
        // <NewComponent text={"This text comes from another component called newComponent.js"}/>

export default Play;
