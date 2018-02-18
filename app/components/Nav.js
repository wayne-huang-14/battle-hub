var React = require('react');
var Router = require('react-router-dom').Router;
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/battle">Battle</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </li>
      </ul>
    </div>
  )
}

module.exports = Nav;