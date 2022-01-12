import * as epic from './SignIn'
import * as reducer from './../Redux/State/SignIn'
import * as session from './../Redux/State/Session'
import { ActionsObservable } from 'redux-observable'
  
describe('Epic :: SignIn :: loadScriptEpic', () => {
  it('dispatches INITIALIZED action', () => {
    const action$ = ActionsObservable.of(reducer.initialize())
    let importedScript = null
    let initializerObj = null

    const deps = {
      window: {
        document: { 
          createElement: () => ({}),
          querySelector: () => ({
            appendChild: script => { 
              importedScript = script
              script.onload() 
            },
          }),
        },
        google: { accounts: { id: { 
          initialize: initObj => { initializerObj = initObj },
        }}},
      },
    }

    return epic.loadScriptEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.INITIALIZED)
        expect(importedScript.src).toEqual('https://accounts.google.com/gsi/client')
        expect(initializerObj.client_id).toEqual(process.env.REACT_APP_GOOGLE_CLIENT_ID)
      })
  })
})

describe('Epic :: SignIn :: renderSignInButtonEpic', () => {
  it('render sign in button', () => {
    const action$ = ActionsObservable.of(reducer.signInButtonMounted())
    let elementId = null;
    let buttonDefinition = {};

    const deps = {
      window: { 
        google: { accounts: { id: { renderButton: (id, definition) => {
          elementId = id
          buttonDefinition = definition
        }}}},
        document: { getElementById: id => id }
      }
    }

    epic.signInEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action).toEqual(undefined)
        expect(elementId).toEqual('sign-in-button')
        expect(buttonDefinition).toEqual({
          type: 'standard',
          size: 'medium',
          text: 'signin_with',
          shape: 'circle',
        })
      })
  })
})

describe('Epic :: SignIn :: signOutEpic', () => {
  it('dispatches SIGN_OUT_SUCCESS action', () => {
    const action$ = ActionsObservable.of(reducer.signOut())
    let isLogout = false

    const deps = {
      window: { google: { accounts: { id: { disableAutoSelect: () => {
        isLogout = true
      }}}}}
    }

    epic.signOutEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.SIGN_OUT_SUCCESS)
        expect(isLogout).toEqual(true)
      })
  })
})

describe('Epic :: SignIn :: getProfileEpic', () => {
  it('dispatches PROFILE_RECEIVED action', () => {
    const tokenMock = 'eyJhbGciOiJSUzI1NiIsImtpZCI6InRlc3QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJ0ZXN0IiwibmJmIjoxLCJhdWQiOiJ0ZXN0Iiwic3ViIjoiMiIsImhkIjoidGVzdC5jb20iLCJlbWFpbCI6ImpvaG4uZG9lQHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6InRlc3QiLCJuYW1lIjoiSm9obiBEb2UiLCJwaWN0dXJlIjoiaHR0cDovL2ltYWdlLnVybCIsImdpdmVuX25hbWUiOiJKb2huIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJpYXQiOjMsImV4cCI6MTY0MTg5NjkxMiwianRpIjoidGVzdCJ9.Fn9ZDpQ6YcoVHiyDBYq4dvTGukNH5vRO1RwRRCY_BcgLbJo7TXG9QvrwiEzClN_Kv2CZcYHAe4vCDNwv5_eej4mEauLWsrdbPG86pakw3ZOpSE5jKMIQ07I5R0NKsANwilsawbzu1CsdSHjb-1kDD0W3SEtFzlDPkNtg56h8IJU00Su29NGXMYls8WTRiMYbw0hkvMXedKmGcpPQLqoAbhwVQ0TIJQAmaVKKm27NYP-d4qQbb-sR0P-CZTHd-rcwt5wChtEQJHsJnnzTkarevcC2YPkKbOEKGMAGyGxIdrBRiSas2uuB_wSCkhqOlQtsW3W1Q3nyKbzcRzCgltzsxw'
    const action$ = ActionsObservable.of(reducer.signInSuccess(tokenMock))

    epic.getProfileEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(session.PROFILE_RECEIVED)
        expect(action.profile).toEqual({
          token: tokenMock,
          name: 'John Doe',
          giveName: 'John',
          familyName: 'Doe',
          imageUrl: 'http://image.url',
          email: 'john.doe@test.com',
        })
      })
  })
})
