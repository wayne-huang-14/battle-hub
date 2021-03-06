import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Footer from './Footer';
import homeBanner from '../images/home-banner.png';
import whoWillTopple from '../images/who-will-topple.png';
import buildNewEmpire from '../images/build-new-empire.png';
import endlessClashPersist from '../images/endless-clash-persist.png';

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
        <section className='home-endless-clash'>
          <img src={endlessClashPersist} alt="Where an endless clash will persist"/>
          <Link to='/battle'>
            <Button>
              BATTLEGROUND
            </Button>
          </Link>
        </section>
        <section>
          <img src={whoWillTopple} alt="Who Will Topple The Regime"/>
        </section>
        <section className='home-leaderboard'>
          <img src={buildNewEmpire} alt="Who Will Topple The Regime"/>
          <Link to="/leaderboard">
            <Button>
              LEADERBOARD
            </Button>
          </Link>
        </section>
        <Footer/>
      </div>
    )
  }
  
}

export default Home;