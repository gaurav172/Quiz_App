import React, { Component } from 'react';
import './ViewPeople.css';

class DeleteQuiz extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        }
      }
    
      // Lifecycle hook, runs after component has mounted onto the DOM structure
      componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/DeleteQuiz');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }
      
  render() {
    function deleteRow(id){
        const request = new Request('http://127.0.0.1:8080/quiz/'+id)
        fetch(request,{method: 'DELETE'})
        .then(response =>{
            if(response.status >= 200 && response.status < 300) 
            window.location.reload();
            });
      }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete Quiz</h1>
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
                      <td><button onClick={() => {deleteRow.bind(this,item.id)()}}>DELETE</button></td>
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

export default DeleteQuiz;
