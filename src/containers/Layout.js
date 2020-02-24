import React, { Component } from "react";
import ConnectSpotify from "../components/ConnectSpotify";
import CoverBuilder from "../components/CoverBuilder";

import { connect } from 'react-redux'
import * as actions from '../store/actions'

class Layout extends Component {

  componentDidMount(){
      if (!this.props.isAuthenticated) {
        const accessToken = this.getHashParams().access_token
        if(accessToken !== undefined)
        this.props.onSetAccessToken(accessToken)
      }
    }

  getHashParams() {
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
  }

  render () {

    return (
      <>
      {!this.props.isAuthenticated ? <ConnectSpotify /> : <CoverBuilder accessToken={this.props.accessToken}></CoverBuilder>}
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.accessToken)
  return {
    playlists: state.playlists,
    accessToken: state.accessToken,
    isAuthenticated: state.isAuthenticated
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    onSetAccessToken : (accessToken) => dispatch(actions.setAccessToken(accessToken)),
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(Layout)

