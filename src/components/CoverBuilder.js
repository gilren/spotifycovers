import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
class CoverBuilder extends Component {

  state = {

  }

  componentDidMount() {
    // this.props.onGetPlaylists();

   this.props.onGetCovers("1vSc3TYLrGYBkZTEGa9t5y" , 324)
  }

  render () {
    let playlists = null
    if(this.props.playlists){
      playlists = this.props.playlists.map(element => {
        return <li key={element.id}>{element.name}</li>
      })
    }

    let covers = null
    if(this.props.covers){
      covers = this.props.covers.map((element, index) => {
        return <img src={element} alt="azz" />
      })
    }
    return (
      <div>
        <ul>{playlists}</ul>
        <ul>{covers}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    url: state.loginUrl,
    playlists: state.playlists,
    tracks: state.tracks,
    covers: state.covers
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    onGetPlaylists : () => dispatch(actions.getUserPlaylists()),
    onGetCovers: (playlists, total) => dispatch(actions.getCovers(playlists, total))
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(CoverBuilder)

