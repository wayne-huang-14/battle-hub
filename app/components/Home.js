var React = require('react');
var Link = require('react-router-dom').Link;
import {Button} from 'semantic-ui-react';
var homeBanner = require('../images/home-banner.png');

class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <div className="banner">
          <img src={homeBanner} />
            <Button>
              <Link to="/battle">BATTLEGROUND</Link>
            </Button>
        </div>
        <section>
          <h3>Where An Endless Clash Will Persist</h3>
        </section>
      </div>
    )
  }
  
}

module.exports = Home;