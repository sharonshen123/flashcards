import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
import Quiz from './component/quiz';
import Cards from './component/cards';
import Services from './services/service';
import Nav from './component/nav';
import Start from './component/Start';
import Modal from './component/Modal';
import Question from './component/Question';
import ApiError from './component/ApiError';
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
          <Route path="/start" component={Start} />
          <Route path="/modal" component={Modal} />
          <Route path="/question" component={Question} />
          <Route path="/apierror" component={ApiError} />
        </Switch>
        <div className="footer col-12">
          <span>All rights reserved &copy;Sharon Shen</span>
        </div>
      </div>
    </Router>
  )
}
function Home() {
  const cacheUsername = localStorage.getItem('userInfo') ?? ''; // checks if user is existing user
  const [username, setUserName] = useState("" || cacheUsername);
  const [isUserSaved, setSaveUser] = useState(false);
  const history = useHistory();

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let username = e.target[0].value;
    // saving user data in localstorage
    localStorage.setItem('userInfo', username);
    setSaveUser(true);
  }

  function renderNewUserBox() {
    return (
      <>
        {isUserSaved ? renderExistingUserBox() :
          <div className="usercontainer">
            <div className="card user-card alert-success">
              <div className="userTitle">
                <h4>Hey!! Lets begin with your user name</h4>
                <hr />
              </div>
              <div className="card-body col-12">
                <form className="userform" onSubmit={handleSubmit}>
                  <div className="offset-2 col-8">
                    <div className="form-group">
                      <input type='text' value={username} placeholder="Enter User Name" onChange={handleUserName} />
                    </div>
                  </div>
                  <div className="home_btns">
                    <button className="btn btn-success" disabled={username.length === 0}>&nbsp;&nbsp;Let's Go&nbsp;&nbsp;</button>
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
        }
      </>
    )
  }
  function renderExistingUserBox() {
    return (
      <div className="container usercontainer" >
        <div className="card user-card alert alert-success">
          <div className="userTitle">
            <div>
              <h3>Hi {username}!</h3>
              <div>
                <label>Let's Begin</label>
              </div>
            </div>
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
