import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import homeBanner from '../images/home-banner.png';
import whoWillTopple from '../images/who-will-topple.png';
import buildNewEmpire from '../images/build-new-empire.png';

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

export default Home;