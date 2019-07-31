import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';

class ViewQuiz extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        }
      }
      static contextTypes= {
        router: PropTypes.object,
      }
      // Lifecycle hook, runs after component has mounted onto the DOM structure
      componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/ViewQuiz');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
    
    View=(id)=>{
       this.context.router.history.push("/ViewQuizbyId/"+id)
   }

  render() {
    let p=this.View
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View Quiz</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Genre</th>           
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{key+1}</td>
                      <td>{item.name}</td>
                      <td>{item.genre}</td>
                      <td><button onClick={() => {p.bind(this,item.id)()}}>View {item.name}</button></td>
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

export default ViewQuiz;
