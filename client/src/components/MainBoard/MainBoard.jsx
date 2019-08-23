/**
 * MainBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 20:36:15
 * @last-modified 2019-08-22 23:38:29
 */

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../../store';
import { Grid, Transition } from 'semantic-ui-react';
import './MainBoard.css';
import PlayerPanel from '../PlayerPanel';
import SongInfoPanel from '../SongInfoPanel';
import ArtistInfoPanel from '../ArtistInfoPanel';
import {
  searchFromGenius,
  getSongInfoFromGenius,
  getReferentsBySongFromGenius
} from '../../actions/geniusActions';

class MainBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Tender is the Night',
      currentSongName: '',
      currentArtists: [''],
      geniusDescription: '',
      geniusTrackInfo: [],
      annotations: [],
      geniusPageUrl: '',
      youtubeUrl: ''
    };
  }

  async searchCurrentSong(trimmedCurrentSongName, currentArtists) {
    // Song name + primary artist name.
    // Tested to yield the most accurate result in Genius.
    const searchTerm = `${trimmedCurrentSongName} ${currentArtists[0]}`;

    return await searchFromGenius({ searchTerm }).then(async res => {
      if (res && res.status === 200 && res.data.length > 0) {
        console.log(res);
        const withMatchedName = res.data.filter(
          songRes => songRes.result.title === trimmedCurrentSongName
        );

        if (withMatchedName.length === 0) {
          return res.data[0].result;
          // return {};
        } else if (withMatchedName.length === 1) {
          return withMatchedName[0].result;
        }
        const withMatchedArtist = withMatchedName.filter(
          songRes =>
            currentArtists.indexOf(songRes.result.primary_artist.name) >= 0
        );
        return withMatchedArtist.length > 0
          ? withMatchedArtist[0].result
          : withMatchedName[0].result;
      }
      return {};
    });
  }

  async getSongInfo() {
    // const searchTerm = this.state.trimmedCurrentSongName;
    const song = await this.searchCurrentSong(
      this.state.trimmedCurrentSongName,
      this.state.currentArtists
    );
    await getSongInfoFromGenius({ songId: song.id })
      .then(async res => {
        if (res.status === 200) {
          const rawDescription = res.data.description.dom.children;
          let pureTextDescription = '';
          // Note: Genius API returns string literal '?' for non-existing description.
          if (rawDescription.length > 0 && rawDescription.indexOf('?') === -1) {
            const flattenDom = arr => {
              const tempArr = arr
                .flat()
                .filter(node => !!node)
                .map(node => {
                  if (node.children) {
                    return node.children;
                  } else {
                    return node;
                  }
                });
              return tempArr.some(e => Array.isArray(e))
                ? flattenDom(tempArr)
                : tempArr;
            };
            pureTextDescription = flattenDom(rawDescription).reduce(
              (str0, str1) => str0 + ' ' + str1
            );
          }
          // Check if there are available media links.
          let youtubeUrl = '';
          if (res.data.media) {
            res.data.media.forEach(m => {
              if (m.provider === 'youtube') {
                youtubeUrl = m.url;
              }
            });
          }
          // Parse track info (artist relations).
          const trackInfo = this.parseTrackInfo(res.data.custom_performances);

          this.props.dispatch({
            type: 'GENIUS_INFO',
            payload: {
              songSummary: pureTextDescription
            }
          });

          // Update states.
          await this.setState({
            geniusDescription: pureTextDescription,
            geniusTrackInfo: trackInfo,
            geniusPageUrl: res.data.url,
            searchedSongName: song.title,
            searchedArtistName: song.primary_artist.name,
            searchedArtistId: song.primary_artist.id,
            youtubeUrl: youtubeUrl
          });
        }
      })
      .catch();
  }

  async getAnnotations() {
    await getReferentsBySongFromGenius({ songId: 74885 })
      .then(async res => {
        if (res.status === 200 && res.data.length > 0) {
          // console.log(res);
          const annotations = this.parseReferents(res.data);
          await this.setState({
            annotations: annotations
          });
        }
      })
      .catch();
  }

  parseTrackInfo(rawData) {
    return rawData.map(category => {
      return [
        category.label,
        category.artists.map(obj => obj.name).reduce((a0, a1) => a0 + ', ' + a1)
      ];
    });
  }

  parseReferents(rawData) {
    return rawData.map(referent => {
      // For simplicity and display, get the first annotation of a referent.
      const anno = referent.annotations[0];
      const map = new Map();
      return map.set(anno.url, anno.body.html);
    });
  }

  async componentWillReceiveProps(nextProps) {
    await this.setState({
      currentSongName: nextProps.currentSongName,
      trimmedCurrentSongName: nextProps.trimmedCurrentSongName,
      currentArtists: nextProps.currentArtists
    });
    await this.getSongInfo();
  }

  async componentWillMount() {}

  render() {
    console.log('GLOBAL REDUX STATE:');
    console.log(store.getState());
    console.log(this.state);

    return (
      <div className="mainBoard">
        <div className="mainBoard-scrollable">
          <Grid columns={3} className="mainBoard-grid">
            <Grid.Column width={4} className="panel mainBoard-left">
              <PlayerPanel
                description={this.state.geniusDescription}
                trackInfo={this.state.geniusTrackInfo}
              />
            </Grid.Column>
            <Grid.Column width={8} className="panel mainBoard-mid">
              <SongInfoPanel
                description={this.state.geniusDescription}
                url={this.state.geniusPageUrl}
                youtubeUrl={this.state.youtubeUrl}
                searchedSongName={this.state.searchedSongName}
                searchedArtistName={this.state.searchedArtistName}
              />
            </Grid.Column>
            <Grid.Column width={4} className="panel mainBoard-right">
              <ArtistInfoPanel searchedArtistId={this.state.searchedArtistId} />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { songInfo } = state;
  return {
    currentSongName: songInfo.currentSongName,
    trimmedCurrentSongName: songInfo.trimmedCurrentSongName,
    currentArtists: songInfo.currentArtists
  };
};

export default connect(
  mapStateToProps,
  null
)(MainBoard);
