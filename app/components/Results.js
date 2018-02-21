var React = require('react');

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props);
    return (
      <p>Results</p>
    )
  }
}

module.exports = Results;