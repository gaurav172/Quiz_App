import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css';
import Sports from './Sports';
import Got from './Got';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class LeaderBoard extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/Slb');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Scoreboard </h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>Score</th>          
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{key+1}</td>
                      <td>{item.username}</td>
                      <td>{item.total}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}
        // <NewComponent text={"This text comes from another component called newComponent.js"}/>

export default LeaderBoard;
