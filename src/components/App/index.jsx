import React from 'react';
import styled from 'styled-components';

import LeftNav from '../LeftNav';
import MainContent from '../MainContent';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #181818;
  overflow: hidden;
`;

const App = () => {
  return (
    <Container>
      <LeftNav />
      <MainContent />
    </Container>
  );
}

export default App;
