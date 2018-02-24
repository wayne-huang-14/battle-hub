var React = require('react');
var Link = require('react-router-dom').Link;
import {Button} from 'semantic-ui-react';
var homeBanner = require('../images/home-banner.png');
var whoWillTopple = require('../images/who-will-topple.png');
var buildNewEmpire = require('../images/build-new-empire.png');

class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <div className="banner">
          <img src={homeBanner}/>
          <Link to="/battle">
            <Button>
              BATTLEGROUND
            </Button>
          </Link>
        </div>
        <section>
          <h3>Where An Endless Clash Will Persist</h3>
        </section>
        <section>
          <img src={whoWillTopple} alt="Who Will Topple The Regime" />
        </section>
        <section className='home-leaderboard'>
          <img src={buildNewEmpire} alt="Who Will Topple The Regime" />
          <Link to="/leaderboard">
            <Button>
              LEADERBOARD
            </Button>
          </Link>
        </section>
      </div>
    )
  }
  
}

module.exports = Home;