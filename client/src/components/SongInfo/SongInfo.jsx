/**
 * SongInfo.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 16:11:56
 * @last-modified 2019-08-04 02:12:05
 */

import React from 'react';
import './SongInfo.css';
import { Container, Header, Divider } from 'semantic-ui-react';
import SongLyrics from './SongLyrics/SongLyrics';
import MiniYoutube from './MiniYoutube/MiniYoutube';
import {
  getSongInfoFromGenius,
  getReferentsBySongFromGenius
} from '../../actions/geniusActions';

class SongInfo extends React.Component {
  render() {
    return (
      <div className="songInfo-panel">
        {/* <MiniYoutube /> */}

        {/* <Container className="songInfo-container title">
          <Header as="h1" className="songInfo-title">
            {this.state.title}
          </Header>
        </Container> */}

        <Container className="songInfo-container lyrics">
          <Header as="h2" className="songInfo-title">
            Lyrics
          </Header>
          <SongLyrics />
        </Container>

        <Container className="songInfo-container annotations" />
      </div>
    );
  }
}

export default SongInfo;
