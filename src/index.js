import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { RequiredAuth } from './components/RequiredAuth';
import { AuthAuthorize } from './pages/auth/Authorize';
import { BottomBar } from './pages/BottomBar';
import { Centercoin } from './pages/centercoin';
import { CentercoinMetamask } from './pages/centercoin/Metamask';
import { Level } from './pages/Level';
import { Notifications } from './pages/Notifications';
import { Pass } from './pages/Pass';
import { PassPrograms } from './pages/PassPrograms';
import { Pay } from './pages/Pay';
import { Referral } from './pages/Referral';
import { Secession } from './pages/Secession';
import { Settings } from './pages/Settings';

const rootNode = document.getElementById('root');

while (rootNode.lastChild) {
  rootNode.removeChild(rootNode.lastChild);
}

export const baseURL =
  window.location.host === 'weblink.hikick.kr'
    ? 'https://coreservice.hikick.kr/v1'
    : 'https://coreservice.staging.hikick.kr/v1';

const GlobalStyle = styled.div`
  :not(input) {
    user-select: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-touch-callout: none;
  }
`;

createRoot(rootNode).render(
  <>
    <Reset />
    <GlobalStyle>
      <BrowserRouter>
        <Switch>
          <Route path='/auth/authorize'>
            <AuthAuthorize />
          </Route>
          <Route path='/'>
            <RequiredAuth>
              <Route path='/level'>
                <Level />
              </Route>
              <Route path='/settings'>
                <Settings />
              </Route>
              <Route path='/notifications'>
                <Notifications />
              </Route>
              <Route path={['/pass', '/passPrograms']} exact>
                <Pass />
              </Route>
              <Route path={'/referral'} exact>
                <Referral />
              </Route>
              <Route path='/passPrograms/:passProgramId'>
                <PassPrograms />
              </Route>
              <Route path='/bottombar'>
                <BottomBar />
              </Route>
              <Route path='/secession'>
                <Secession />
              </Route>
              <Route path='/centercoin/metamask'>
                <CentercoinMetamask />
              </Route>
              <Route path='/centercoin' exact>
                <Centercoin />
              </Route>
              <Route path='/pay'>
                <Pay />
              </Route>
            </RequiredAuth>
          </Route>
        </Switch>
      </BrowserRouter>
    </GlobalStyle>
  </>
);
