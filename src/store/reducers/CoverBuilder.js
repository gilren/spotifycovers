import * as credentials from '../../spotify-credentials'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loginUrl: '',
  accessToken: '',
  isAuthenticated: false
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}


export function getAuthUrl(state, action) {
  return updateObject(state, {loginUrl: action.loginUrl})
}

export function setAccessToken(state, action) {
  return updateObject(state, {accessToken: action.accessToken, isAuthenticated: true})
}

export function getUserPlaylists(state, action) {
  return updateObject(state, {playlists: action.playlists})
}


/*
const params = this.getHashParams();
const access_token = params.access_token;
if(access_token) {
this.props.isAuth(access_token)
}

}*/

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_AUTH_URL: return getAuthUrl(state, action)
    case actionTypes.SET_ACCESS_TOKEN: return setAccessToken(state, action)
    case actionTypes.GET_USER_PLAYLISTS: return getUserPlaylists(state, action)

    default:
      return state
  }
}


export default reducer