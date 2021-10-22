import React from 'react'
import './SignIn.css';

// SignIn :: Props -> Reac.Component
export default ({signIn}) => <>
  <div
    id="g_id_onload"
    data-client_id={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
    data-callback={signIn}
  ></div>
  <div className="g_id_signin" data-type="standard" shape="circle"></div>
</>
