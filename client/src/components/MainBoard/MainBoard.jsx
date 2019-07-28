/**
 * MainBoard.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-27 20:36:15
 * @last-modified 2019-07-27 21:17:54
 */

import React from 'react';
import { Grid, Segment, Image, Header, Transition } from 'semantic-ui-react';
import './MainBoard.css';
import CurrentSong from '../CurrentSong/CurrentSong';
import SongLyrics from '../SongLyrics/SongLyrics';
import ArtistInfo from '../ArtistInfo/ArtistInfo';

class MainBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      fullTitles: []
    };
  }

  render() {
    return (
      <div className="mainBoard">
        <Grid columns={3} divided className="mainBoard-grid">
          <Grid.Column className="panel mainBoard-left">
            <CurrentSong />
          </Grid.Column>
          <Grid.Column className="panel mainBoard-mid">
            <Image src="/images/wireframe/paragraph.png" />
          </Grid.Column>
          <Grid.Column className="panel mainBoard-right">
            <ArtistInfo />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default MainBoard;
