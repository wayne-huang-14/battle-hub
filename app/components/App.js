var React = require('react');
var Home = require('./Home');
var Battle = require('./Battle');
var Leaderboard = require('./Leaderboard');
var Nav = require('./Nav');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Results = require('./Results');

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
            <Route render={function() {
              return <p>Page Not Found</p>;
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;