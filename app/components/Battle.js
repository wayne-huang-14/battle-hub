import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import {Button} from 'semantic-ui-react';
import noIcon from '../images/no.png';
import yesIcon from '../images/yes.png';
import leftSword from '../images/left-sword.png';
import rightSword from '../images/right-sword.png';
import leftRightSword from '../images/left-right-sword.png';

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
   * Handles when the input is changed and updates the input's value.
   *
   * @param event
   */
  handleChange(event) {
    const value = event.target.value;
    
    this.setState(() => ({username: value}));
  }
  
  /**
   * Calls the parent's onSubmit handler to update the parent's state.
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
    const { id, label } = this.props;
    const { username } = this.state;
    
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
      swordsClash: false,
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFightButtonMouseOver = this.handleFightButtonMouseOver.bind(this);
    this.handleFightButtonMouseOut = this.handleFightButtonMouseOut.bind(this);
  }
  
  /**
   * Sets both player's name and image states.
   *
   * @param {string} id
   * @param {string} username
   */
  handleSubmit(id, username) {
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`
    }));
  }
  
  /**
   * Resets the target player's name and image states.
   *
   * @param {string} id
   */
  handleReset(id) {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null
    }));
  }
  
  /**
   * Handles mouse over event on the fight button.
   */
  handleFightButtonMouseOver() {
    this.setState(function() {
      return {
        swordsClash: true
      }
    })
  }
  
  /**
   * Handles mouse out event on the fight button.
   */
  handleFightButtonMouseOut() {
    this.setState(function() {
      return {
        swordsClash: false
      }
    })
  }
  
  render() {
    const { playerOneName, playerOneImage, playerTwoName, playerTwoImage, swordsClash } = this.state;
    const { match } = this.props;
  
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
                  onClick={() => this.handleReset('playerOne')}
                />
              </a>
            </PlayerPreview>
          }
          
          <div className='swords-icon-container'>
            {(playerOneImage !== null && !swordsClash) &&
              <img src={leftSword} alt='Left Sword' />
            }
            
            {(playerTwoImage !== null && !swordsClash) &&
              <img src={rightSword} alt='Right Sword' />
            }
            
            {swordsClash &&
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
                  onClick={() => this.handleReset('playerTwo')}
                />
              </a>
            </PlayerPreview>
          }
        </section>
        
        {playerOneImage && playerTwoImage &&
          <div className='fight-container'>
            <Link
              to={{
                pathname: `${match.url}/results`,
                search: `?playerOneName=${playerOneName }&playerTwoName=${playerTwoName}`
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

export default Battle;