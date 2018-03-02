import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoIcon from '../images/logo.png';

export default function Nav() {
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