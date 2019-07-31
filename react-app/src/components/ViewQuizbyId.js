import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';


class ViewQuizbyId extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      str: "",
    }
  }

  static contextTypes= {
    router: PropTypes.object,
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    let id=this.props.match.params.id;
    const request = new Request('http://127.0.0.1:8080/playquiz/'+id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    const rquest = new Request('http://127.0.0.1:8080/quizname/'+id);    
    fetch(rquest)
        .then(response => response.json())
          .then(result => this.setState({str: result.name}));
  }

  Edit=(id)=>{
    this.context.router.history.push("/EditQue/"+id)
  }

  render() {
      let e=this.Edit
    function deleteQue(id){
        const request = new Request('http://127.0.0.1:8080/que/'+id)
        fetch(request,{method: 'DELETE'})
      }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.str}</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{key+1}</td>
                      <td>{item.que}</td>
                      <td>{item.op1}</td>
                      <td>{item.op2}</td>
                      <td>{item.op3}</td>
                      <td><button onClick={() => {deleteQue.bind(this,item.id)()}}>Delete Question</button></td>
                      <td><button onClick={() => {e.bind(this,item.id)()}}>Edit Question</button></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewQuizbyId;
