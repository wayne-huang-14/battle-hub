import React from 'react';
import { Link } from 'react-router-dom';
import logoColumn from '../images/logo-column.png';

export default function Footer() {
  return (
    <footer>
      <div>
        <Link to='/'>
          <img src={logoColumn} alt="Battle Hub" />
        </Link>
        <p>Battle Hub is coded by WayneH. Designed by EmberN.. Inspired by TylerM</p>
      </div>
    </footer>
  )
}