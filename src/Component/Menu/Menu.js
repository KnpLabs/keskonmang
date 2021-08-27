import React from 'react'
import { Link } from "react-router-dom";
import './Menu.css';
import Icon from '../Icon/Icon'
import SignIn from './../SignIn'

// Menu :: Props -> Reac.Component
export default ({
  signOut,
  user,
  isSignedIn,
}) => isSignedIn
  ? <div className="user-menu">
    <div className="navbar-item has-dropdown is-hoverable">
      <Icon name="apps-outline" className="menu-icon" />

      <div className="navbar-dropdown is-right">
        <Link className="navbar-item" to="/history">Historique</Link>
        <hr className="navbar-divider" />
        <Link className="navbar-item sign-out" to="/" onClick={signOut}>
          {(user && user.imageUrl) &&
            <figure>
              <img src={user.imageUrl} alt={user.name ? user.name : 'Image de profile'}/>
            </figure>          
          }
          Déconnexion
        </Link>
      </div>
    </div>
  </div>
  : <SignIn/>
