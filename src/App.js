import React from 'react';
import './App.css';
import Quiz from './Quiz';
import Cards from './Cards';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {

    return (
    <Router>
        <div className="App">
            <Nav />
           
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/Home" component={Home}/>
                <Route path="/Cards" component={Cards}/>
            </Switch>              
           
            
          </div>
          </Router>
      )
    }
    const Home=() => (
        <div>
            <h1>Home Page</h1>
        </div>
    );
    export default App;
