import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class GetScore extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Quiz App</h1>
        </header>
        <h4>Score=>{this.props.match.params.score}</h4>
      </div>
    );
  }
}
        // <NewComponent text={"This text comes from another component called newComponent.js"}/>

export default GetScore;
