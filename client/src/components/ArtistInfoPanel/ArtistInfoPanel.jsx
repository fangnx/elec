/**
 * ArtistInfoPanel.jsx
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-08-31 17:20:43
 * @last-modified 2019-10-24 21:50:05
 */

import React from 'react';
import { Image, Container, Header, Icon, Placeholder } from 'semantic-ui-react';
import './ArtistInfoPanel.css';

const ArtistInfoPanel = props => (
  <div className="artistInfoPanel">
    <Container className="artistInfo-container title">
      <Header as="h1" className="artistInfo-name">
        {props.name ? (
          props.name
        ) : (
          <Placeholder fluid inverted>
            <Placeholder.Line />
          </Placeholder>
        )}
      </Header>
      <div className="socialMedia">
        {props.name ? (
          <>
            <Icon name="facebook square" />
            <Icon name="twitter square" />
            <Icon name="instagram" />
          </>
        ) : (
          <Placeholder fluid inverted>
            <Placeholder.Line />
          </Placeholder>
        )}
      </div>
    </Container>

    <div className="topImage-wrapper">
      {props.isReady ? (
        <Image src={props.mainImage} className="topImage" />
      ) : (
        <Placeholder inverted>
          <Placeholder.Image style={{ height: 275, width: 275 }} />
        </Placeholder>
      )}
    </div>

    <Container className="artistInfo-container summary">
      <Header as="h3">Bio</Header>
      {props.isReady ? (
        <div
          className="textFocusAnimation"
          dangerouslySetInnerHTML={{ __html: props.summary }}
        />
      ) : (
        <Placeholder fluid inverted>
          {props.fillArr.map((_, index) => (
            <Placeholder.Line key={`artistSummary-placeholderLine-${index}`} />
          ))}
        </Placeholder>
      )}
    </Container>
  </div>
);

export default ArtistInfoPanel;
