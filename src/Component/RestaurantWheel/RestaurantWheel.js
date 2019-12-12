import React from 'react'

// Menu :: Props -> Reac.Component
export default ({submitForm, handleChange, address}) => 
  <div>
    <h1>Qu'est ce qu'on mange ce midi</h1>
    <p>Trouve un resto' proche de toi !</p>
    <form onSubmit={submitForm}>
      <label>Adresse</label>
      <input type="text" name="address" onChange={handleChange} value={address} />
      <input type="submit" value="Qu'est ce qu'on mange ?" />
    </form>
  </div>
