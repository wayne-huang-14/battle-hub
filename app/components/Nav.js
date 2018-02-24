var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var Link = require('react-router-dom').Link;
var logoIcon = require('../images/logo.png');

function Nav() {
  return (
    <nav id='main-menu'>
      <div className='logo'>
        <Link to='/'>
          <img src={logoIcon} alt="Battle Hub" />
        </Link>
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