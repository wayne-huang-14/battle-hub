var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var queryString = require('query-string');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');
import { Button } from 'semantic-ui-react';
var leftSwordClash = require('../images/left-sword-clash.png');

function PlayerInfo(props) {
  var profile = props.profile;
  
  return (
    <div className='player-profile-container'>
      <ul style={{textAlign: props.textAlignClass}}>
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
    var players = queryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(results) {
      if (results === null) {
        this.setState(function() {
          return {
            error: 'Error: Check that both Github usernames exist.',
            loading: false
          }
        })
      }
      
      this.setState(function() {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    }.bind(this));
  }
  
  render() {
    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;
    
    if (loading) {
      return (
        <div>
          <p>Loading...</p>
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