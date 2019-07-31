import React, { Component } from 'react';
import './Home.css';
import PropTypes from 'prop-types';


class Logout extends Component {

    static contextTypes= {
        router: PropTypes.object,
      }

componentDidMount() {
    localStorage.clear();
    window.location.reload();
    this.context.router.history.push("/");
  }
  render() {
    let user=localStorage.getItem("username");
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Quiz App {user}</h1>
        </header>
      </div>
    );
  }
}
        // <NewComponent text={"This text comes from another component called newComponent.js"}/>

export default Logout;
