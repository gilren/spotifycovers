import React, { Component } from "react";
import ConnectSpotify from "../components/ConnectSpotify";
import CoverBuilder from "../components/CoverBuilder";

import { connect } from 'react-redux'
import * as actions from '../store/actions'

class Layout extends Component {

  componentDidMount(){
      this.props.onSetAccessToken()
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
    onSetAccessToken : () => dispatch(actions.setAccessToken()),
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(Layout)

