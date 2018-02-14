var React = require('react');
var Leaderboard = require('./Leaderboard');

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Leaderboard />
      </div>
    )
  }
}

module.exports = App;