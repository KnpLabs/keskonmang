import React from 'react'
import '../../Style/Menu.css';

// Menu :: Props -> Reac.Component
export default ({
  signOut,
  user,
}) => 
  <button className="sign-out" onClick={signOut}>
    {(user && user.imageUrl) &&
      <figure>
        <img src={user.imageUrl} alt={user.name ? user.name : 'Image de profile'}/>
      </figure>          
    }
    Déconnexion
  </button>
