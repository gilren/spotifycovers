import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
class CoverBuilder extends Component {

  state = {

  }

  componentDidMount() {
    // this.props.onGetPlaylists();

   this.props.onGetCover("1vSc3TYLrGYBkZTEGa9t5y" , 324)
  }

  render () {
    let playlists = null
    if(this.props.playlists){
      playlists = this.props.playlists.map(element => {
        return <li key={element.id}>{element.name}</li>
      })
    }
    return <ul>{playlists}</ul>
  }
}

const mapStateToProps = state => {
  return {
    url: state.loginUrl,
    playlists: state.playlists,
    tracks: state.tracks,
    cover: state.cover
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    onGetPlaylists : () => dispatch(actions.getUserPlaylists()),
    onGetCover: (playlists, total) => dispatch(actions.getCover(playlists, total))
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(CoverBuilder)

