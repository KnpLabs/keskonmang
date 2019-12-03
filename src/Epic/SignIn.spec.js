import * as epic from './SignIn'
import * as reducer from './../Redux/State/SignIn'
import { ActionsObservable } from 'redux-observable'

describe('Epic :: SignIn :: signInEpic', () => {
  it('dispatches SIGN_IN_SUCCESS action', done => {
    const action$ = ActionsObservable.of(reducer.signInButtonMounted())
    const renderMock = [];

    const deps = {
      getGoogleApi: () => ({
        signin2: {
          render: (id, options) => {
            renderMock.push(id)
            return options.onsuccess('a GoogleUser type')
          }
        }
      })
    }

    epic.signInEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.SIGN_IN_SUCCESS)
        expect(action.user).toEqual('a GoogleUser type')
        expect(renderMock[0]).toEqual('gapi-signin')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: SignIn :: signOutEpic', () => {
  it('dispatches SIGN_OUT_SUCCESS action', done => {
    const action$ = ActionsObservable.of(reducer.signOut())
    const deps = {
      getGoogleApi: () => ({
        auth2: {
          getAuthInstance: () => ({
            signOut: () => Promise.resolve()
          })
        }
      })
    }

    epic.signOutEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.SIGN_OUT_SUCCESS)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})

describe('Epic :: SignIn :: getBasicProfileEpic', () => {
  it('dispatches PROFILE_RECEIVED action', done => {
    const userMock = {
      getBasicProfile: () => ({
        getName: () => 'KNP Labs',
        getGivenName: () => 'KNP',
        getFamilyName: () => 'Labs',
        getImageUrl: () => 'http://www.noop.org/img.jpg',
        getEmail: () => 'test@knpeer.com'
      }),
      getAuthResponse: () => ({
        id_token: 'a google token',
      }),
    }
    const action$ = ActionsObservable.of(reducer.signInSuccess(userMock))

    epic.getBasicProfileEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toEqual(reducer.PROFILE_RECEIVED)
        expect(action.profile).toEqual({
          token: 'a google token',
          name: 'KNP Labs',
          giveName: 'KNP',
          familyName: 'Labs',
          imageUrl: 'http://www.noop.org/img.jpg',
          email: 'test@knpeer.com',
        })
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
