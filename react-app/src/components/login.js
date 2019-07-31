import React, { Component } from 'react';
import './Log.css';
import PropTypes from 'prop-types';

// import UserProfile from './login';

class login extends Component{
    constructor(){
        super();
        this.state={
            formData:{
                username:"",
                password:"",
            },
          submitted: false,         
        }
        this.handleUChange = this.handleUChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    static contextTypes= {
        router: PropTypes.object,
      }
    
      componentDidMount() {
        let user=localStorage.getItem("username");
        if(user!=null)
            this.context.router.history.push("/");
      }


    handleUChange(event) {
        this.state.formData.username = event.target.value;
    }
    handlePChange(event) {
        this.state.formData.password = event.target.value;
    }
    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
            .then(response => {
                if (response.status == 200){
                    this.setState({submitted: true});                 
                    localStorage.setItem("username",this.state.formData.username);
                    window.location.reload();
                    this.context.router.history.push("/")                    
                }else{ 
                    alert("Failed!")}
            }, err => alert("No Such Username or Password"));
    }
    render(){
    return(
     <div className="App">
        <header className="App-header">
          <h1 className="App-title">Log In</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange} />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>
        </div>
    );
}
}
export default login;