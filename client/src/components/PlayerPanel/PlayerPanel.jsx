/**
 * PlayerPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-16 01:45:13
 * @last-modified 2019-08-22 23:53:23
 */

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import './PlayerPanel.css';
import { Container, Image, Icon, Header } from 'semantic-ui-react';
import WithScrollbar from '../Scrollbar/Scrollbar';
import spotifyGreenIcon from '../../assets/Spotify_Icon_CMYK_Green.png';
import TrackArtistsInfo from './TrackArtistsInfo/TrackArtistsInfo';
import { initSpotifyApi } from '../../App';
import { trimSongName } from '../../utils/commonUtils';
import PlayerWidget from './PlayerWidget';
import SongSummaryWidget from './SongSummaryWidget';

class LeftPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      currentSongName: '',
      currentArtists: [],
      songImg: ''
    };
  }

  async getCurrentSong() {
    const spotifyApi = await initSpotifyApi();

    setInterval(async () => {
      spotifyApi
        .getMyCurrentPlaybackState()
        .then(res => {
          const spotifySongName = res.item.name;
          const spotifyArtists = res.item.artists.map(artist => artist.name);
          const { currentSongName, currentArtists } = store.getState().songInfo;
          // if (
          //   spotifySongName === currentSongName &&
          //   spotifyArtists.every(e => currentArtists.indexOf(e) > -1)
          // ) {
          //   return;
          // }

          if (res) {
            this.setState({
              isReady: true
            });
          }

          this.props.dispatch({
            type: 'SONG_INFO',
            payload: {
              currentSongName: spotifySongName,
              trimmedCurrentSongName: trimSongName(spotifySongName),
              currentSongImg: res.item.album.images[0].url,
              currentArtists: spotifyArtists,
              externalSpotifyUrl: res.item.external_urls.spotify
            }
          });
        })
        .catch(err => console.log(err));
    }, 5000);
  }

  componentWillMount() {
    this.getCurrentSong();
  }

  onClickUrl(type) {
    if (type === 'spotify') {
      window.open(this.state.externalSpotifyUrl);
    }
  }

  render() {
    return (
      <div className="playerPanel">
        {this.state.isReady ? (
          <div>
            <PlayerWidget />

            <div className="playerPanel-text">
              <Container className="playerPanel-container">
                <Header as="h3">About the Song</Header>
                <SongSummaryWidget />
              </Container>

              <Container className="playerPanel-container">
                <Header as="h3">Track Info</Header>
                <TrackArtistsInfo data={this.props.trackInfo} />
              </Container>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

LeftPanel = WithScrollbar(LeftPanel);

export default connect(
  null,
  null
)(LeftPanel);
