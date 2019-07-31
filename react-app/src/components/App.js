import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import NewPerson from './NewPerson';
import login from './login';
import Home from './Home';
import Play from './Play';
import CreateQue from './NewQuestion';
import Sports from './Sports';
import Got from './Got';
import Quiz from './Quiz';
import ViewQuiz from './ViewQuiz';
import DeleteQuiz from './DeleteQuiz';
import AddQuiz from './AddQuiz';
import PlayQuiz from './PlayQuiz';
import AddQuestion from './AddQuestion';
import ViewQuizbyId from './ViewQuizbyId';
import EditQue from './EditQue';
import Lead from './Lead';
import Logout from './Logout';
import GetScore from './GetScore';
import PropTypes from 'prop-types';
import Slb from './Slb';
import Glb from './Glb';
import LeaderBoard from './LeaderBoard';



import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {

  static contextTypes= {
    router: PropTypes.object,
  }

  render() {
    let user=localStorage.getItem("username");
  function Signout(){
    localStorage.clear();
  }
    if(user==null)
    {
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>React App</Link>
                  </div>
                  <ul className="nav navbar-nav">
  
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/NewPerson'}>Sign Up</Link></li>
                    {/* <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                    <li><Link to={'/ViewPeople'}>View People</Link></li> */}
                    <li><Link to={'/login'}>Log In</Link></li>
                    {/* <li><Link to={'/Quiz'}>Admin Panel</Link></li>
                    <li><Link to={'/Play'}>Play Quizzes</Link></li>
                    <li><Link to={'/Logout'}>Sign Out</Link></li> */}
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />
                   <Route exact path='/NewPerson' component={NewPerson} />
                   {/* <Route exact path='/DeletePerson' component={DeletePerson} /> */}
                   {/* <Route exact path='/ViewPeople' component={ViewPeople} /> */}
                   <Route exact path='/login' component={login} />
                   <Route exact path='/Logout' component={Logout} />
                   {/* <Route exact path='/NewQuestion/:id' component={CreateQue} />
                   <Route exact path='/Sports' component={Sports} />
                   <Route exact path='/Got' component={Got} />  
                   <Route exact path='/Play' component={Play} />  
                   <Route exact path='/Quiz' component={Quiz} />
                   <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                   <Route exact path='/AddQuiz' component={AddQuiz} /> 
                   <Route exact path='/ViewQuiz' component={ViewQuiz} /> 
                   <Route exact path='/PlayQuiz/:id' component={PlayQuiz} />
                   <Route exact path='/GetScore/:score' component={GetScore} />  
                   <Route exact path='/AddQuestion' component={AddQuestion} />
                   <Route exact path='/ViewQuizbyId/:id' component={ViewQuizbyId} />
                   <Route exact path='/EditQue/:id' component={EditQue} /> */}
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
    if(user=="admin")
    {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">

                  <li><Link to={'/'}>Home</Link></li>
                  {/* <li><Link to={'/NewPerson'}>Sign Up</Link></li> */}
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  <li><Link to={'/Lead'}>LeaderBoard</Link></li>
                  {/* <li><Link to={'/login'}>Log In</Link></li> */}
                  <li><Link to={'/Quiz'}>Admin Panel</Link></li>
                  <li><Link to={'/Play'}>Play Quizzes</Link></li>
                  <li><Link to={'/Logout'}>Sign Out</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/Home' component={Home} />
                 <Route exact path='/NewPerson' component={NewPerson} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/login' component={login} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route exact path='/Lead' component={Lead} />
                 <Route exact path='/Slb' component={Slb} />
                 <Route exact path='/Glb' component={Glb} />
                 <Route exact path='/LeaderBoard' component={LeaderBoard} />
                 <Route exact path='/NewQuestion/:id' component={CreateQue} />
                 <Route exact path='/Sports' component={Sports} />
                 <Route exact path='/Got' component={Got} />  
                 <Route exact path='/Play' component={Play} />  
                 <Route exact path='/Quiz' component={Quiz} />
                 <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                 <Route exact path='/AddQuiz' component={AddQuiz} /> 
                 <Route exact path='/ViewQuiz' component={ViewQuiz} /> 
                 <Route exact path='/PlayQuiz/:id' component={PlayQuiz} />
                 <Route exact path='/GetScore/:score' component={GetScore} />  
                 <Route exact path='/AddQuestion' component={AddQuestion} />
                 <Route exact path='/ViewQuizbyId/:id' component={ViewQuizbyId} />
                 <Route exact path='/EditQue/:id' component={EditQue} />
            </Switch>
          </div>
        </Router>
      </div>
    );
    }
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">

                  <li><Link to={'/'}>Home</Link></li>
                  {/* <li><Link to={'/NewPerson'}>Sign Up</Link></li> */}
                  {/* <li><Link to={'/DeletePerson'}>Delete Person</Link></li> */}
                  {/* <li><Link to={'/ViewPeople'}>View People</Link></li> */}
                  {/* <li><Link to={'/login'}>Log In</Link></li> */}
                  {/* <li><Link to={'/Quiz'}>Admin Panel</Link></li> */}
                  <li><Link to={'/Lead'}>LeaderBoard</Link></li>
                  <li><Link to={'/Play'}>Play Quizzes</Link></li>
                  <li><Link to={'/Logout'}>Sign Out</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 {/* <Route exact path='/Home' component={Home} /> */}
                 <Route exact path='/NewPerson' component={NewPerson} />
                 {/* <Route exact path='/DeletePerson' component={DeletePerson} /> */}
                 {/* <Route exact path='/ViewPeople' component={ViewPeople} /> */}
                 <Route exact path='/login' component={login} />
                 <Route exact path='/Logout' component={Logout} />
                 {/* <Route exact path='/NewQuestion/:id' component={CreateQue} /> */}
                 <Route exact path='/Sports' component={Sports} />
                 <Route exact path='/Got' component={Got} />  
                 <Route exact path='/Slb' component={Slb} />
                 <Route exact path='/Glb' component={Glb} />
                 <Route exact path='/Play' component={Play} />  
                 <Route exact path='/Lead' component={Lead} />  
                 <Route exact path='/LeaderBoard' component={LeaderBoard} />
                 {/* <Route exact path='/Quiz' component={Quiz} /> */}
                 {/* <Route exact path='/DeleteQuiz' component={DeleteQuiz} /> */}
                 {/* <Route exact path='/AddQuiz' component={AddQuiz} />  */}
                 {/* <Route exact path='/ViewQuiz' component={ViewQuiz} />  */}
                 <Route exact path='/PlayQuiz/:id' component={PlayQuiz} />
                 <Route exact path='/GetScore/:score' component={GetScore} />  
                 {/* <Route exact path='/AddQuestion' component={AddQuestion} /> */}
                 {/* <Route exact path='/ViewQuizbyId/:id' component={ViewQuizbyId} /> */}
                 {/* <Route exact path='/EditQue/:id' component={EditQue} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
