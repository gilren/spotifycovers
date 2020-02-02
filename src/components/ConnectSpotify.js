import React, { Component } from 'react';
// import * as SpotifyFunctions from '../Spotify'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class ConnectSpotify extends Component {

  componentDidMount() {
    this.props.onGetAuthUrl()
  }

  render() {
    return (
      <div className="ConnectSpotify">
        <a href={this.props.url}>
          Se connecter
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.loginUrl
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    onGetAuthUrl: () => dispatch(actions.getAuthUrl())
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(ConnectSpotify)
