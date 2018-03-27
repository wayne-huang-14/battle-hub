import React from 'react';
import Home from './Home';
import Battle from './Battle';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTopRoute from './ScrollToTopRoute';
import Results from './Results';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav/>
          <Switch>
            <ScrollToTopRoute exact path="/" component={Home}/>
            <ScrollToTopRoute exact path="/battle" component={Battle}/>
            <ScrollToTopRoute path="/battle/results" component={Results}/>
            <ScrollToTopRoute path="/leaderboard" component={Leaderboard}/>
            <ScrollToTopRoute render={() => <p>Page Not Found</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;