import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Quiz extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Admin Panel</h1>
        </header>
        <h4><Link to={'/AddQuestion'}>Add Questions</Link></h4>
        <h4><Link to={'/AddQuiz'}>Add Quiz</Link></h4>
        <h4><Link to={'/DeleteQuiz'}>Delete Quiz</Link></h4>
        <h4><Link to={'/ViewQuiz'}>View Quiz</Link></h4>
      </div>
    );
  }
}
        // <NewComponent text={"This text comes from another component called newComponent.js"}/>

export default Quiz;
