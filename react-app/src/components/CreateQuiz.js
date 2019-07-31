import React, { Component } from 'react';
import './NewPerson.css';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        que: "",
        op1: "",
        op2: "",
        no: 1,
        op3: "",
        correct: "",
      },
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handleO1Change = this.handleO1Change.bind(this);
    this.handleO2Change = this.handleO2Change.bind(this);
    this.handleO3Change = this.handleO3Change.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/question', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleQChange(event) {
    this.state.formData.que = event.target.value;
  }
  handleO1Change(event) {
    this.state.formData.op1 = event.target.value;
  }
  handleO2Change(event) {
    this.state.formData.op2 = event.target.value;
  }
   handleO3Change(event) {
    this.state.formData.op3 = event.target.value;
  }
   handleCChange(event) {
    this.state.formData.correct = event.target.value;
  }
  handleNChange(event) {
    this.state.formData.no = Number(event.target.value);
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Quiz Id</label>
                <input type="number" className="form-control" value={this.state.no} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.que} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <label>Option 1</label>
                <input type="text" className="form-control" value={this.state.op1} onChange={this.handleO1Change}/>
            </div>
            <div className="form-group">
                <label>Option 2</label>
                <input type="text" className="form-control" value={this.state.op2} onChange={this.handleO2Change}/>
            </div>
            <div className="form-group">
                <label>Option 3</label>
                <input type="text" className="form-control" value={this.state.op3} onChange={this.handleO3Change}/>
            </div>
             <div className="form-group">
                <label>Correct Answer</label>
                <input type="text" className="form-control" value={this.state.correct} onChange={this.handleCChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New Question successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default CreateQuiz;
