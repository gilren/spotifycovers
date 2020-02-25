import * as actionTypes from './actionTypes'
import * as credentials from '../../spotify-credentials'
import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify();

// export const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS'
// export const GET_PLAYLISTS = 'GET_PLAYLISTS'
// export const GET_TRACKS = 'GET_TRACKS'
// export const GET_ALBUMS_COVER = 'GET_ALBUMS_COVER'



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

export const setAccessToken = (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
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

export const getPlaylistTracksSuccess = (tracks) => {
  return {
    type: actionTypes.GET_USER_PLAYLISTS,
    tracks: tracks
  }
}

/*
  Get a user playlist from user which is defined in @setAccessToken
*/
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

const getPlaylistTracks = (playlistId) => {
    const tracksResponse = spotifyApi.getPlaylistTracks(playlistId)
}


const getTracks = async (playlistId ,total) => {
  const settings = getIterationAndRemainder(total, 100)
  let tracks = []
  for(let x = 0, ln = settings.iterations; x < ln; x++) {

    let limit = credentials.GET_TRACKS_LIMIT
    let offset = x * credentials.GET_TRACKS_LIMIT
    if (settings.remainder > 0 && x === ln - 1) {
      limit -= (credentials.GET_TRACKS_LIMIT - settings.remainder)
    }
    await spotifyApi.getPlaylistTracks(playlistId, {fields: 'total,items(track(album(id)))', limit: limit, offset: offset})
    .then(data => {
      tracks.push(data.items.map((trackObject) => {
        return trackObject.track.album.id
      }))
    })
  }
  return tracks.flat(1)
}

// TODO : clean up sorting

export const getCovers = (playlistId ,total) => {

  return dispatch => {
    getTracks(playlistId, total).then(
      (tracks) => {
        
        let albums = []
        let duplicates = {};
        tracks.forEach((x) => { duplicates[x] = (duplicates[x] || 0)+1; });
        
        let arrDuplicates = [];
        
        for (let album in duplicates) {
          arrDuplicates.push([album, duplicates[album]]);
        }
        arrDuplicates.sort(function(a, b) {
            return b[1] - a[1];
        });
        
        albums.push(arrDuplicates.slice(0, 4).map( x => x[0]))
        console.log(albums)
  
        let covers = []
        spotifyApi.getAlbums(albums, {market :'from_token'}).then((data) => {
          covers = data.albums.map((album) => {
            return album.images[1].url
          })
        }).then(() => {
          return dispatch(getCoversSuccess(covers))
        })
      })
  }
}

export const getCoversSuccess = (covers) => {
  return {
    type: actionTypes.GET_COVERS,
    covers: covers
  }
}


const getIterationAndRemainder = (total, limit) => {
  var out = {
    iterations: Math.floor(total / limit),
    remainder: 0
  }
  if (total % limit !== 0) {
    out.iterations++
    out.remainder = total % limit
  }
  return out
}


export const getAlbums = () => {
  return dispatch => {
    const playlistsResponse = spotifyApi.getAlbums();
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

// uploadCustomPlaylistCoverImage