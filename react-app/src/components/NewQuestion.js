import React, { Component } from 'react';
import './NewPerson.css';

class CreateQue extends Component {
  constructor() {
    super();
    this.state = {
      str: "",
      formData: {
        que: "",
        op1: "",
        op2: "",
        no: 1,
        op3: "",
        c1: false,
        c2: false,
        c3: false,
      },
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handleO1Change = this.handleO1Change.bind(this);
    this.handleO2Change = this.handleO2Change.bind(this);
    this.handleO3Change = this.handleO3Change.bind(this);
    this.handleC1Change = this.handleC1Change.bind(this);
    this.handleC2Change = this.handleC2Change.bind(this);
    this.handleC3Change = this.handleC3Change.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    let id=this.props.match.params.id
    const rquest = new Request('http://127.0.0.1:8080/quizname/'+id);    
    fetch(rquest)
    .then(response => response.json())
      .then(result => this.setState({str: result.name}));
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
   handleC1Change(event) {
    let x = {...this.state.formData,"c1":true};
    let y = {...this.state.formData,"c1":false};
    if(event.target.checked==true)
        this.setState({formData:x});
    else
        this.setState({formData:y});
  }
  handleC2Change(event) {
    let x = {...this.state.formData,"c2":true};
    let y = {...this.state.formData,"c2":false};
    if(event.target.checked==true)
        this.setState({formData:x});
    else
        this.setState({formData:y});
  }
  handleC3Change(event) {
    let x = {...this.state.formData,"c3":true};
    let y = {...this.state.formData,"c3":false};
    if(event.target.checked==true)
        this.setState({formData:x});
    else
        this.setState({formData:y});
  }
  render() {
    this.state.formData.no=parseInt(this.props.match.params.id,10);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question for {this.state.str}</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.que} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <label>Option 1</label>
                <input type="text" className="form-control" value={this.state.op1} onChange={this.handleO1Change}/>
                <label> Correct </label>
                <input type="checkbox" className="form-check-input"  onChange={this.handleC1Change}/>
            </div>
            <div className="form-group">
                <label>Option 2</label>
                <input type="text" className="form-control" value={this.state.op2} onChange={this.handleO2Change}/>
                <label> Correct </label>
                <input type="checkbox" className="form-check-input" onChange={this.handleC2Change}/>
            </div>
            <div className="form-group">
                <label>Option 3</label>
                <input type="text" className="form-control" value={this.state.op3} onChange={this.handleO3Change}/>
                <label> Correct </label>
                <input type="checkbox" className="form-check-input" onChange={this.handleC3Change}/>
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

export default CreateQue;
