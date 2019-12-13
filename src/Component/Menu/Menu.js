import React from 'react'

// Menu :: Props -> Reac.Component
export default ({
  signOut,
  user,
}) => 
  <nav className="hidden">
    <ul>
      <li>
        {(user && user.imageUrl && user.name) &&
          <figure>
            <img src={user.imageUrl} alt={user.name}/>
            <figcaption>Hi {user.name} ! Feeling hungry huh ?</figcaption>
          </figure>          
        }        
      </li>
      <li>
        <button onClick={signOut}>Sign out</button>
      </li>
    </ul>    
  </nav>
