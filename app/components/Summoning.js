import React from 'react';
import PropTypes from 'prop-types';
import summoning from '../images/summoning.png';

class Summoning extends React.Component {
  static propTypes = {
    phrases: PropTypes.array.isRequired,
    speed: PropTypes.number.isRequired
  };
  
  static defaultProps = {
    phrases: [ 'Summoning...', 'Come To Me Souls So Sweet...', 'I Will Give You Something Good To Eat!' ],
    speed: 500,
  };
  
  state = {
    phrase: this.props.phrases[0]
  };
  
  componentWillMount() {
    let index = 0;
    this.interval = window.setInterval(() => {
      if (index === this.props.phrases.length - 1) {
        index = 0;
      } else {
        index++;
      }

      this.setState(() => ({ phrase: this.props.phrases[ index ] }));
    }, this.props.speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  
  render() {
    const { phrase } = this.state;
    
    return (
      <div className='summoning-container'>
        <p>{phrase}</p>
        <img src={summoning} alt='Summoning...' />
      </div>
    )
    
  }
}

export default Summoning;