import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Footer from './Footer';
import { Button } from 'semantic-ui-react';
import noIcon from '../images/no.png';
import yesIcon from '../images/yes.png';
import leftSword from '../images/left-sword.png';
import rightSword from '../images/right-sword.png';
import leftRightSword from '../images/left-right-sword.png';

/**
 * The view that allows the user to enter a username.
 */
class PlayerInput extends React.Component {
  static propTypes = {
    id: Proptypes.string.isRequired,
    label: Proptypes.string.isRequired,
    onSubmit: Proptypes.func.isRequired
  };
  
  state = {
    username: ''
  };
  
  /**
   * Handles when the input is changed and updates the input's value.
   *
   * @param event
   */
  handleChange = (event) => {
    const value = event.target.value;
    
    this.setState(() => ({ username: value }));
  };
  
  /**
   * Calls the parent's onSubmit handler to update the parent's state.
   *
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  };
  
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

class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerOneImage: null,
    playerTwoName: '',
    playerTwoImage: null,
    swordsClash: false,
  };
  
  /**
   * Sets both player's name and image states.
   *
   * @param {string} id
   * @param {string} username
   */
  handleSubmit = (id, username) => {
    this.setState(() => ({
      [ id + 'Name' ]: username,
      [ id + 'Image' ]: `https://github.com/${username}.png?size=200`
    }));
  };
  
  /**
   * Resets the target player's name and image states.
   *
   * @param {string} id
   */
  handleReset = (id) => {
    this.setState(() => ({
      [ id + 'Name' ]: '',
      [ id + 'Image' ]: null
    }));
  };
  
  /**
   * Handles mouse over event on the fight button.
   */
  handleFightButtonMouseOver = () => {
    this.setState(function () {
      return {
        swordsClash: true
      }
    })
  };
  
  /**
   * Handles mouse out event on the fight button.
   */
  handleFightButtonMouseOut = () => {
    this.setState(function () {
      return {
        swordsClash: false
      }
    })
  };
  
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
          
          <div className='swords-icon-container' style={swordsClash ? { width: '8rem' } : null}>
            {(playerOneImage !== null && !swordsClash) &&
            <img className='left-sword' src={leftSword} alt='Left Sword' />
            }
            
            {(playerTwoImage !== null && !swordsClash) &&
            <img className='right-sword' src={rightSword} alt='Right Sword' />
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
        
        <div className='fight-container'>
          {playerOneImage && playerTwoImage &&
            <div className='fight-content'>
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
                  FIGHT TO THE DEATH
                </Button>
              </Link>
              <p>
                Based on Repository Analysis
                (followers + stars of all public repositories)
              </p>
            </div>
          }
          </div>
        <Footer />
      </div>
    )
  }
}

export default Battle;