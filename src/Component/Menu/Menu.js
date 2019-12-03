import React from 'react'

// Menu :: Props -> Reac.Component
export default ({
  signOut
}) => 
  <nav>
    <ul>
      <li>
        <button onClick={signOut}>Sign out</button>
      </li>
    </ul>    
  </nav>
