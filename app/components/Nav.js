import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoIcon from '../images/logo.png';
import logoIconHover from '../images/logo-hover.png';

export default function Nav() {
  return (
    <nav id='main-menu'>
      <div className='logo'>
        <Link to='/'>
          <img src={logoIcon} alt="Battle Hub" />
          <img src={logoIconHover} alt="Battle Hub" />
        </Link>
      </div>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active disabled-link">ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/battle" activeClassName="active disabled-link">BATTLEGROUND</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active disabled-link">LEADERBOARD</NavLink>
        </li>
      </ul>
    </nav>
  )
}