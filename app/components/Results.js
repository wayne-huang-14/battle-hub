const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');
const queryString = require('query-string');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');
const Loading = require('./Loading');
import { Button } from 'semantic-ui-react';
const leftSwordClash = require('../images/left-sword-clash.png');

/**
 * Contains player info after the battle.
 *
 * @param profile
 * @returns {*}
 * @constructor
 */
function PlayerInfo({ profile, textAlignClass }) {
  return (
    <div className='player-profile-container'>
      <ul style={{textAlign: textAlignClass}}>
        <li>OTHER INFO</li>
        {profile.name && <li>{profile.name}</li>}
        {profile.location && <li>{profile.location}</li>}
        {profile.company && <li>{profile.company}</li>}
        <li>Followers: {profile.followers}</li>
        <li>Following: {profile.following}</li>
        <li>Public Repos: {profile.public_repos}</li>
        {profile.blog && <li><a href={profile.blog}>{profile.blog}</a></li>}
      </ul>
    </div>
  )
}

PlayerPreview.prototypes = {
  profile: PropTypes.object.isRequired
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      winner: '',
      loser: '',
      error: null,
      loading: true
    };
  }
  
  componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);
    
    api.battle([
      playerOneName,
      playerTwoName
    ]).then((players) => {
      if (players === null) {
        this.setState(() => ({
          error: 'Error: Check that both Github usernames exist.',
          loading: false
        }))
      }
      
      this.setState(() => ({
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false
      }))
    });
  }
  
  render() {
    const { winner, loser, error, loading } = this.state;
    
    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      )
    }
    
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }
    
    return (
      <div id='results'>
        <h3>To The Victor The Spoils!</h3>
        <div className='battle-username-container'>
          <PlayerInfo
            profile={winner.profile}
            textAlignClass='right'
          />
          <PlayerPreview
            title='Won'
            username={winner.profile.login}
            score={winner.score}
            image={winner.profile.avatar_url}
          >
          </PlayerPreview>
          <div className='swords-icon-container'>
            {<img src={leftSwordClash} alt='Left sword dominating right sword.'/>}
          </div>
          <PlayerPreview
            title='Lost'
            username={loser.profile.login}
            score={loser.score}
            image={loser.profile.avatar_url}
          >
          </PlayerPreview>
          <PlayerInfo
            profile={loser.profile}
            textAlignClass='left'
          />
        </div>
        <div className='battle-again-container'>
          <Link to="/battle">
            <Button>
              BATTLE AGAIN
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

module.exports = Results;