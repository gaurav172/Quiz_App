import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Lead extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LeaderBoard</h1>
        </header>
        <h4><Link to={'/LeaderBoard'}>Overall LeaderBoard</Link></h4>
        <h4><Link to={'/Slb'}>Sports LeaderBoard</Link></h4>
        <h4><Link to={'/Glb'}>Game of Thrones LeaderBoard</Link></h4>
      </div>
    );
  }
}
        // <NewComponent text={"This text comes from another component called newComponent.js"}/>

export default Lead;
