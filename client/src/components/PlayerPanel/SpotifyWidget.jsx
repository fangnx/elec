/**
 * SpotifyWidget.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-22 22:51:58
 * @last-modified 2019-08-31 18:09:38
 */

import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

class SpotifyWidget extends React.Component {
  onClickUrl(type) {
    if (type === 'spotify') {
      window.open(this.props.externalSpotifyUrl);
    }
  }

  render() {
    return (
      <div className="playerWidget">
        <Image src={this.props.songImg} wrapped className="currentSong-img" />
        <div className="playerWidget-text">
          <div className="songName">{this.props.songName}</div>
          <div className="artistNames">
            {this.props.artists ? this.props.artists.join(', ') : ''}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { songInfo } = state;
  return {
    songName: songInfo.currentSongName,
    songImg: songInfo.currentSongImg,
    artists: songInfo.currentArtists,
    externalSpotifyUrl: songInfo.externalSpotifyUrl
  };
};

export default connect(
  mapStateToProps,
  null
)(SpotifyWidget);
