import React, { Component } from 'react';
import './ViewPeople.css';

class Sports extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        }
      }
    
      // Lifecycle hook, runs after component has mounted onto the DOM structure
      componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/sports');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sports Quiz</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Genere</th>
              <th>Quiz No</th>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Correct Answer</th>             
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.genre}</td>
                      <td>{item.no}</td>
                      <td>{item.que}</td>
                      <td>{item.op1}</td>
                      <td>{item.op2}</td>
                      <td>{item.op3}</td>
                      <td>{item.correct}</td>
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

export default Sports;
