var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var logoIcon = require('../images/logo.png');

function Nav() {
  return (
    <nav id='main-menu'>
      <div className='logo'>
        <img src={logoIcon} alt="Battle Hub" />
      </div>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/battle" activeClassName="active">Battle</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">Leaderboard</NavLink>
        </li>
      </ul>
    </nav>
  )
}

module.exports = Nav;