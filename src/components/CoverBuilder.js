import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import TextareaAutosize from 'react-textarea-autosize';


class CoverBuilder extends Component {

  state = {
    title : '2019',
    height : '240px',
    currentPlaylist : '',
    fontStyle : {
      fontSize: '60px',
      textTransform: 'uppercase'
    }
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }
  
  handleTitleSizeChange(direction) {
    let oldState = {...this.state}
    let oldFontSize = Number(oldState.fontStyle.fontSize.slice(0, -2))
    let newFontSizeValue = ''


    if(direction === 'UP') {
      if(oldFontSize !== 246 ) {
        newFontSizeValue = (oldFontSize + 8) + 'px'
      }else {
        newFontSizeValue = oldFontSize + 'px'
      }
    } else {
      newFontSizeValue = (oldFontSize - 8) + 'px'
    }

    this.setState({
      fontStyle: {
        ...oldState.fontStyle,
        fontSize: newFontSizeValue,
      }
    })
  }

  handlePlaylistSelect(event) {
    const id = event.target.value

    let playlistsCopy = this.props.playlists.slice(0)

    const playlists = playlistsCopy.reduce((obj, item) => {
      obj[item['id']] = item
      return obj
    }, {})
     
   this.props.onGetCovers(playlists[id].id , playlists[id].total)

   this.setState({
     currentPlaylist : playlists[id].id,
     title: playlists[id].name 
   })
  }
  
  componentDidMount() {
    this.props.onGetPlaylists();
    // if(this.props.playlists){
    // this.setState({
    //   currentPlaylist : this.state.playlists[0]
    // })
  // }
    
  }

  render () {
    let playlists = null
    if(this.props.playlists){
      playlists = this.props.playlists.map(element => {
        return <option key={element.id} value={element.id}>{element.name}</option>
      })
    }

    let covers = null
    if(this.props.covers){
      covers = this.props.covers.map((element, index) => {
        return <img key={index} src={element} alt="azz" />
      })
    }
    return (
      <div>
        <select id="playlists" name="playlists" form="playlists" onChange={(event) => this.handlePlaylistSelect(event)}>{playlists}</select>
        <div className="covers">
          <TextareaAutosize value={this.state.title} style={this.state.fontStyle} onChange={(event) => this.handleTitleChange(event)}/>
          {covers}
        </div>
        <button onClick={() => this.handleTitleSizeChange('UP')}>UP</button>
        <button onClick={() => this.handleTitleSizeChange('DOWN')}>DOWN</button>
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

