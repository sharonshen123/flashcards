import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Quiz from './component/quiz';
import Cards from './component/cards';
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
const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);
export default App;
