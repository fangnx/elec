/**
 * PlayerPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-31 17:13:05
 * @last-modified 2019-08-31 18:34:13
 */

import React from 'react';
import SpotifyWidget from './SpotifyWidget';
import SongSummaryWidget from './SongSummaryWidget';
import { Container, Header } from 'semantic-ui-react';
import './PlayerPanel.css';

const PlayerPanel = () => (
  <div className="playerPanel">
    <SpotifyWidget />

    <div className="playerPanel-text">
      <Container className="playerPanel-container">
        <Header as="h3">About</Header>
        <SongSummaryWidget />
      </Container>
    </div>
  </div>
);

export default PlayerPanel;
