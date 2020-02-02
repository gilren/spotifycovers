import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
class CoverBuilder extends Component {

  state = {

  }

  componentDidMount() {
    
    this.props.onGetPlaylists();

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
    playlists: state.playlists
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    onGetPlaylists : () => dispatch(actions.getUserPlaylists()),
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(CoverBuilder)

