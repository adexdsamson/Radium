import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { APP, APP_TOPIC } from '../Routes/route';
import { auth, providerFacebook, providerGoogle, Userdatabase, authRef } from '../utilities/firebase';
import { connect } from 'react-redux';
//import App from '../App';




const style = {
  backgroundImage: 'url(bg-01.jpg)'
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        var user = authRef.currentUser;
        user.providerData.forEach(profile => {
          let Data = {
            UserId: authRef.currentUser.uid,
            name: profile.displayName,
            email: profile.email,
            photoURL: profile.photoURL
          }
          var id = profile.uid;
          Userdatabase(Data, id)
          this.props.history.push(APP);
        });
      }
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      providerFacebook,
      providerGoogle
    ]
  };

  
  render() { 
    
    return ( 
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form-title" style={style}>
              
            </div>
              <p>Please sign-in:</p>
              <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={this.uiConfig} firebaseAuth={auth}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
 
export default connect(mapStateToProps)(Register);