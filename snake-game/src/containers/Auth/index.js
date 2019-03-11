import React, { Component } from 'react'
import styles from './index.module.css'
import firebase from '../../utils/initFirebase' 
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { NULL_USER } from '../../utils/constants'
import Spinner from '../../components/Spinner'

class Auth extends Component {

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to / after sign in is successful. Alternatively you can provide a 
    // callbacks.signInSuccessWithAuthResult function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // // Update this if needed
    // callbacks: {
    //   signInSuccessWithAuthResult: this.authSuccessfulHandler
    // }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          user = user.providerData[0]
          delete user.phoneNumber
          this.props.onAuthSignIn(user)
        } else {
          this.props.onAuthFailed()
        }
      }
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  logOutHandler = () => {
    firebase.auth().signOut()
    this.props.onAuthLogout()
  }

  render() {

    /*
      TRICK:
      To improve the UX of signing in with StyledFirebaseAuth UI component,
      we have set the default user as NULL_USER (string). Once the Authentication
      happens through firebase, it'll either fail or be successful, assigning user
      to be null or {userObj} respectively
    */

    return (
      <div>
        {this.props.user === NULL_USER ? 
            (<Spinner />) :
            (
              <div className={styles.AuthContainer}>
                <div className={styles.AuthTitle}>PLEASE SIGN IN TO PLAY!</div>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()} />
              </div>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthSignIn: (user) => dispatch(actions.authSignIn(user)),
    // onAuthSuccessful: (user) => dispatch(actions.authSuccessful(user)),
    onAuthFailed: (user) => dispatch(actions.authFailed()),
    onAuthLogout: (user) => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)