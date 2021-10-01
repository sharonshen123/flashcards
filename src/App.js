import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
          <Route path="/home" component={Home} />
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

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let username = e.target[0].value;
    localStorage.setItem('userInfo', username); // saving user data in localstorage
  }

  function checkUserInfo() {
    if (username.length === 0) {
      alert('Pls enter user name to proceed');
    }
  }

  return (!Services.checkUserCache() ?
    <div className="usercontainer" >
      <h3>Enter Details to Begin</h3>
      <form className="userform" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type='text' value={username} placeholder="Enter User Name" onChange={handleUserName} />
        </div>
        <div className="form-group">
          <button className="userbtn" disabled={username.length === 0} onClick={checkUserInfo}>Proceed</button>
        </div>
      </form>
    </div >
    :
    <div className="usercontainer" >
      <h3>Welcome Back {username}</h3>
    </div >
  )
};


export default App;
