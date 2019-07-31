import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    function delRow(id,eve){
      fetch('http://localhost:8080/people/'+id, {
        method: 'DELETE',
      })
      .then(response =>{
      if(response.status >= 200 && response.status < 300) 
      window.location.reload();
      });
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete Person</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>username</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{key+1}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td><button className="btn btn-warning" onClick={ delRow.bind(this,item.id)}>Delete</button></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default DeletePerson;