import React from 'react'
import { Link } from "react-router-dom";
import './Menu.css';

// Menu :: Props -> Reac.Component
export default ({
  signOut,
  user,
}) => 
  <div className="user-menu">
    <div className="navbar-item has-dropdown is-hoverable">
      <ion-icon class="menu-icon" name="apps-outline"></ion-icon>

      <div className="navbar-dropdown is-right">
        <Link className="navbar-item" to="/history">Historique</Link>
        <hr className="navbar-divider" />
        <a href="/" className="navbar-item sign-out" onClick={signOut}>
          {(user && user.imageUrl) &&
            <figure>
              <img src={user.imageUrl} alt={user.name ? user.name : 'Image de profile'}/>
            </figure>          
          }
          Déconnexion
        </a>
      </div>
    </div>
  </div>
