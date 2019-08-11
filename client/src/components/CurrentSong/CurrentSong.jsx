/**
 * CurrentSong.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-16 01:45:13
 * @last-modified 2019-08-11 01:41:27
 */

import React from 'react';
import { connect } from 'react-redux';
import './CurrentSong.css';
import { Container, Image, Icon, Header, Divider } from 'semantic-ui-react';
import WithScrollbar from '../Scrollbar/Scrollbar';
import spotifyGreenIcon from '../../assets/Spotify_Icon_CMYK_Green.png';
import TrackArtistsInfo from './TrackArtistsInfo/TrackArtistsInfo';
import { initSpotifyApi } from '../../App';

class CurrentSong extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      currentSongName: '',
      currentArtists: [],
      songImg: ''
    };
  }

  /**
   * @deprecated
   */
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  async getCurrentSong() {
    const spotifyApi = await initSpotifyApi();

    spotifyApi
      .getMyCurrentPlaybackState()
      .then(res => {
        const currentSongName = res.item.name;
        const currentArtists = res.item.artists.map(artist => artist.name);

        this.props.dispatch({
          type: 'SONG_INFO',
          payload: {
            currentSongName,
            currentArtists
          }
        });

        if (res) {
          // console.log(res);
          this.setState({
            isReady: true,
            currentSongName,
            currentArtists,
            songImg: res.item.album.images[0].url
          });
        } else {
          this.setState({
            isReady: true,
            songImg: spotifyGreenIcon
          });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.getCurrentSong();
  }

  render() {
    const { isReady, currentSongName, currentArtists, songImg } = this.state;

    return (
      <div className="currentSong-panel">
        {isReady ? (
          <div className="currentSong-widget">
            <Image src={songImg} wrapped className="currentSong-img" />
            <div className="currentSong-text">
              <div className="songName">{currentSongName}</div>
              <div className="artistNames">{currentArtists[0]}</div>
              {/* <div className="spotifySource">
                  <Image
                    as={Icon}
                    src={spotifyWhiteIcon}
                    wrapped
                    className="spotify-icon"
                  />
                </div> */}

              <Container className="currentSong-container aboutTheSong">
                <Header as="h3" className="aboutTheSong-header">
                  About the Song
                </Header>
                <div>{this.props.description}</div>
              </Container>

              <Container className="currentSong-container trackInfo">
                <Header as="h3" className="trackInfo-header">
                  Track Info
                </Header>
                <TrackArtistsInfo data={this.props.trackInfo} />
              </Container>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

CurrentSong = WithScrollbar(CurrentSong);

export default connect(
  null,
  null
)(CurrentSong);
