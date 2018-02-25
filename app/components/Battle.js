var React = require('react');
var Proptypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');
import {Button} from 'semantic-ui-react';
var noIcon = require('../images/no.png');
var yesIcon = require('../images/yes.png');
var leftSword = require('../images/left-sword.png');
var rightSword = require('../images/right-sword.png');
var leftRightSword = require('../images/left-right-sword.png');

/**
 * The view that allows the user to enter a username.
 */
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
    
    this.setState(function () {
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
      <div className='player-wrapper'>
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
            className='confirm-cancel-icon'
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
      playerTwoImage: null,
      swordClash: false,
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFightButtonMouseOver = this.handleFightButtonMouseOver.bind(this);
    this.handleFightButtonMouseOut = this.handleFightButtonMouseOut.bind(this);
  }
  
  handleSubmit(id, username) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      
      return newState;
    });
  }
  
  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      
      return newState;
    });
  }
  
  handleFightButtonMouseOver() {
    this.setState(function() {
      return {
        swordClash: true
      }
    })
  }
  
  handleFightButtonMouseOut() {
    this.setState(function() {
      return {
        swordClash: false
      }
    })
  }
  
  render() {
    var playerOneName = this.state.playerOneName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoName = this.state.playerTwoName;
    var playerTwoImage = this.state.playerTwoImage;
    var match = this.props.match;
    var swordClash = this.state.swordClash;
  
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
          
          {playerOneImage !== null &&
            <PlayerPreview
              title='Ready To Fight!'
              username={playerOneName}
              image={playerOneImage}
            >
              <a className='confirm-cancel-icon'>
                <img
                  src={noIcon}
                  onClick={this.handleReset.bind(null, 'playerOne')}
                />
              </a>
            </PlayerPreview>
          }
          
          <div className='swords-icon-container'>
            {(playerOneImage !== null && !swordClash) &&
              <img src={leftSword} alt='Left Sword' />
            }
            
            {(playerTwoImage !== null && !swordClash) &&
              <img src={rightSword} alt='Right Sword' />
            }
            
            {swordClash &&
              <img src={leftRightSword} alt='Swords clashing' />
            }
          </div>
          
          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player 2 Username'
            onSubmit={this.handleSubmit}
          />
          }
          
          {playerTwoImage !== null &&
          <PlayerPreview
            title='Ready To Fight!'
            username={playerTwoName}
            image={playerTwoImage}
          >
            <a className='confirm-cancel-icon'>
              <img
                src={noIcon}
                onClick={this.handleReset.bind(null, 'playerTwo')}
              />
            </a>
          </PlayerPreview>
          }
        </section>
        {playerOneImage && playerTwoImage &&
        <div className='fight-container'>
          <Link
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}
          >
            <Button
              onMouseOver={this.handleFightButtonMouseOver}
              onMouseOut={this.handleFightButtonMouseOut}
            >
              Fight To The Death!
            </Button>
          </Link>
        </div>
        }
      </div>
    )
  }
  
}

module.exports = Battle;