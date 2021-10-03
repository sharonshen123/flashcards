import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
import Quiz from './component/quiz';
import Cards from './component/cards';
import Services from './services/service';
import Nav from './component/nav';
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/cards" component={Cards} />
          <Route path="/quiz" component={Quiz} />
        </Switch>
      </div>
    </Router>
  )
}
function Home() {
  const cacheUsername = localStorage.getItem('userInfo') ?? ''; // checks if user is existing user
  const [username, setUserName] = useState("" || cacheUsername);
  const [isUserSaved, saveUser] = useState(false);
  const history = useHistory();

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let username = e.target[0].value;
    localStorage.setItem('userInfo', username); // saving user data in localstorage
    saveUser(true);
  }

  function renderNewUserBox() {
    return (
      <div className="usercontainer">
        <div className="card user-card alert-success">
          <div className="userTitle">
            <h6>Hey User!! Welcome</h6>
            <div className="col-12">
              <span> Fill your username to continue. </span>
              <span>User name will be used by the application to store your user data</span>
            </div>
          </div>
          <div className="card-body col-12">
            <form className="userform" onSubmit={handleSubmit}>
              <div className="offset-2 col-8">
                <div className="form-group">
                  <input type='text' value={username} placeholder="Enter User Name" onChange={handleUserName} />
                </div>
              </div>
              <div className="home_btns">
                <button className="btn btn-warning" disabled={username.length === 0}>&nbsp;&nbsp;Save User&nbsp;&nbsp;</button>
              </div>
              {/* {username.length !== 0 &&
                <div className="col">
                  <button type="button" className="btn btn-success" onClick={() => history.push('/quiz')} disabled={!isUserSaved}> Play Quiz&nbsp;</button>
                  <button type="button" className="btn btn-success" onClick={() => history.push('/cards')} disabled={!isUserSaved}> Learn Words</button>
                </div>
              } */}
            </form>
          </div>
        </div>
      </div>
    )
  }
  function renderExistingUserBox() {
    return (
      <div className="usercontainer" >
        <div className="card user-card alert alert-success">
          <div className="userTitle">
            <div><strong>Hi {username}!!</strong> Great to see you back !!</div>
          </div>
          <div className="card-body">
            <div className="home_btns">
              <button type="button" className="btn btn-success" onClick={() => history.push('/quiz')}> Play Quiz&nbsp;</button>
              <button type="button" className="btn btn-success" onClick={() => history.push('/cards')}> Learn Words</button>
            </div>
          </div>
        </div>
      </div >
    )
  }

  return (!Services.checkUserCache() ? renderNewUserBox() : renderExistingUserBox())
};


export default App;
