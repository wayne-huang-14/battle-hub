import React from 'react';
import Home from './Home';
import Battle from './Battle';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Results from './Results';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/battle" component={Battle}/>
            <Route path="/battle/results" component={Results}/>
            <Route path="/leaderboard" component={Leaderboard}/>
            <Route render={() => <p>Page Not Found</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;