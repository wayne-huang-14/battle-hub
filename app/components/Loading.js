import React from 'react';
import PropTypes from 'prop-types';

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
  };
  
  static defaultProps = {
    text: 'Loading',
    speed: 250
  };
  
  state = {
    text: this.props.text
  };
  
  componentDidMount() {
    var stopper = this.props.text + '...';
    
    this.interval = window.setInterval(function() {
      if (this.state.text === stopper) {
        this.setState(function() {
          return {
            text: this.props.text
          }
        })
      } else {
        this.setState(function(prevState) {
          return {
            text: prevState.text + '.'
          }
        })
      }}.bind(this), this.props.speed);
  }
  
  componentWillUnmount() {
    // A test to see when the interval is cleared
    // console.log('Clear the interval!');
    // This is to prevent the interval above to continue running until the user closes the app
    window.clearInterval(this.interval);
  }
  
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

export default Loading;