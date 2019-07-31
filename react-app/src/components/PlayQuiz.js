import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';


class PlayQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      str: "",
      formData: {
          username: "",
          qid: 0,
          score: 0,
      }
    };
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

opA = (event,key) => {
    let Ini= [...this.state.data];
    if(event.target.checked==true)
        Ini[key].ap1=true;
    else
        Ini[key].ap1=false;
    this.setState({data: Ini});
}

opB = (event,key) => {
    let Ini= [...this.state.data];
    if(event.target.checked==true)
        Ini[key].ap2=true;
    else
        Ini[key].ap2=false;
    this.setState({data: Ini});
}

opC = (event,key) => {
    let Ini= [...this.state.data];
    if(event.target.checked==true)
        Ini[key].ap3=true;
    else
        Ini[key].ap3=false;
    this.setState({data: Ini});
}

handleSubmit = (event) => {
    event.preventDefault()
    let totalscore=0;
    for(var que in this.state.data)
    {
        totalscore+=1
        if(this.state.data[que].ap1==undefined)
        {
            let Ini= [...this.state.data];
            Ini[que].ap1=false;
            this.setState({data: Ini})
        }
        if(this.state.data[que].ap2==undefined)
        {
            let Ini= [...this.state.data];
            Ini[que].ap2=false;
            this.setState({data: Ini})
        }
        if(this.state.data[que].ap3==undefined)
        {
            let Ini= [...this.state.data];
            Ini[que].ap3=false;
            this.setState({data: Ini})
        }
    }
    for(var que in this.state.data)
    {
        if(this.state.data[que].ap1==this.state.data[que].c1 && this.state.data[que].ap2==this.state.data[que].c2 && this.state.data[que].ap3==this.state.data[que].c3)
            this.state.formData.score=this.state.formData.score+1;
    }
    let Ini= [...this.state.formData]; 
    this.state.formData.score=(this.state.formData.score/totalscore)*100;
    this.state.formData.username=localStorage.getItem("username");
    let id=this.props.match.params.id;
    this.state.formData.qid=parseInt(id,10); 
    console.log(id);
    fetch('http://localhost:8080/addscore', {
        method: 'POST', 
        body: JSON.stringify(this.state.formData),
      })
      this.context.router.history.push("/");    
}

  render() {
    let markA=this.opA;
    let markB=this.opB;
    let markC=this.opC;
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">{this.state.str}</h1>
        </header>
          {this.state.data.map(function(item, key) {
               return (
                 <div class="Block">
                    <div className="iBlock">
                     <div className="op">{key+1}</div>
                    <div className="op">{item.que}</div>
                    </div>
                    <div className="iBlock">
                      <input type="checkbox" className="form-check-input" onClick= { (event) => markA(event,key) } />                      
                      <div className="op"> {item.op1}</div>
                    </div>
                    <div className="iBlock">                    
                      <input type="checkbox" className="form-check-input" onClick= { (event) => markB(event,key) } />                        
                      <div className="op"> {item.op2}</div>
                    </div>
                    <div className="iBlock">
                      <input type="checkbox" className="form-check-input" onClick= { (event) => markC(event,key) } />                      
                      <div className="op"> {item.op3}</div>
                    </div>                    
                </div>
                )
             })}
                {/* <div> */}
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit} >Submit</button>
                {/* </div> */}
      </div>
    );
  }
}

export default PlayQuiz;
