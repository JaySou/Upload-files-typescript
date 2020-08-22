import './common/template/Dependencies';
import React, { useState } from 'react';

/** Component Routes */
import Routes from './Routes';

/** Components template */
import NavBar from './common/template/NavBar';
import HeaderContent from './common/template/HeaderContent';
import Footer from './common/template/Footer';
import ContentContainer from './common/template/ContentContainer';
import ContentWrapper from './common/template/ContentWrapper';

export default function App() {

  const [title, setTile] = useState('');

  return (
    <React.Fragment>
      <NavBar handleSetTitle={setTile}/>
      <ContentWrapper>
        <HeaderContent title={title}/>
        <ContentContainer>
          <Routes />
        </ContentContainer>
      </ContentWrapper>
      <Footer />
    </React.Fragment >
  );
}