var React = require('react');
var Home = require('./Home');
var Battle = require('./Battle');
var Leaderboard = require('./Leaderboard');
var Nav = require('./Nav');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/battle" component={Battle}/>
            <Route path="/leaderboard" component={Leaderboard}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;