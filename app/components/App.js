const React = require('react');
const Home = require('./Home');
const Battle = require('./Battle');
const Leaderboard = require('./Leaderboard');
const Nav = require('./Nav');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
const Results = require('./Results');

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

module.exports = App;