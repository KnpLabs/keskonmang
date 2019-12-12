import React from 'react'

// Menu :: Props -> Reac.Component
export default ({
  user,
}) => 
  <div>
    <h1>Qu'est ce qu'on mange ce midi</h1>
    <p>Sélectionne simplement ton adresse</p>
    <form>
      <label>Adresse</label>
      <input type="text" name="address" />
    </form>
  </div>
