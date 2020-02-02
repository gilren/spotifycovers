import * as actionTypes from './actionTypes'
import * as credentials from '../../spotify-credentials'
import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify();

// export const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS'
// export const GET_PLAYLISTS = 'GET_PLAYLISTS'
// export const GET_TRACKS = 'GET_TRACKS'
// export const GET_ALBUMS_COVER = 'GET_ALBUMS_COVER'

function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export const getAuthUrl = () => {
  const url = "https://accounts.spotify.com/authorize" 
  + '?client_id=' + credentials.CLIENT_ID
  + '&response_type=token'
  + '&redirect_uri=' + encodeURIComponent(credentials.REDIRECT_URI)
  + '&scope=' + encodeURIComponent(credentials.SCOPES.join(' '))
  return {
    type: actionTypes.GET_AUTH_URL,
    loginUrl: url
  }
}

export const setAccessToken = () => {
  const params = getHashParams();
  const accessToken = params.access_token;
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
    
  }
  return {
    type: actionTypes.SET_ACCESS_TOKEN,
    accessToken: accessToken
  }
}

export const getUserPlaylistsSuccess = (playlists) => {
  return {
    type: actionTypes.GET_USER_PLAYLISTS,
    playlists: playlists
  }
}

export const getUserPlaylists = () => {
  return dispatch => {
    const playlistsResponse = spotifyApi.getUserPlaylists();
    playlistsResponse
    .then(res => {
      console.log(res)
      const playlists = res.items.map((playlistObject) => {
        const { id, name } = playlistObject;
        return { id: id, name: name };
      });
      dispatch(getUserPlaylistsSuccess(playlists))
    })
    .catch(err=> {
      // console.log(err)
    })
  }
}
