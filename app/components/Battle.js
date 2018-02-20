var React = require('react');
var Proptypes = require('prop-types');
var yesIcon = require('../images/yes.png');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  /**
   * Handles when the input is changed and updates the input's value
   *
   * @param event
   */
  handleChange(event) {
    var value = event.target.value;
    
    this.setState(function() {
      return {
        username: value
      }
    });
  }
  
  /**
   * Calls the parent's onSubmit handler to update the parent's state
   *
   * @param event
   */
  handleSubmit(event) {
    event.preventDefault();
    
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }
  
  render() {
    var id = this.props.id;
    var label = this.props.label;
    var username = this.state.username;
    
    return (
      <div className='player-input-wrapper'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={id}>
            {label}
          </label>
          <input
            id={id}
            type='text'
            autoComplete='off'
            value={username}
            onChange={this.handleChange}
          />
          <p>Please type a valid GitHub username.</p>
          {username &&
            <input
              type='image'
              src={yesIcon}
              alt='Submit'
            />
          }
        </form>
      </div>
    )
  }
}

PlayerInput.propTypes = {
  id: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  onSubmit: Proptypes.func.isRequired
};

class Battle extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      playerOneName: '',
      playerOneImage: null,
      playerTwoName: '',
      playerTwoImage: null
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/ ' + username + '.png?size=200';
      
      return newState;
    })
  }
  
  render() {
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    
    return (
      <div id="battle">
        <h3>Are You Ready?</h3>
        <section className='battle-username-container'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player 1 Username'
              onSubmit={this.handleSubmit}
            />
          }
          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player 2 Username'
              onSubmit={this.handleSubmit}
            />
          }
        </section>
      </div>
    )
  }
  
}

module.exports = Battle;