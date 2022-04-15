import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { Settings } from './pages/Settings';
import { AuthAuthorize } from './pages/auth/Authorize';
import { Level } from './pages/Level';
import { Notification } from './pages/Notification';
import { Pass } from './pages/Pass';
import { Referral } from './pages/Referral';
import { Secession } from './pages/Secession';
import { Sidebar } from './pages/Sidebar';
import { Pay } from './pages/Pay';
import { PassPrograms } from './pages/PassPrograms';
import { Debug } from './pages/Debug';
import { RequiredAuth } from './components/RequiredAuth';

export const baseURL =
  window.location.host === 'weblink.hikick.kr'
    ? 'https://coreservice.hikick.kr/v1'
    : 'https://coreservice.staging.hikick.kr/v1';

const GlobalStyle = styled.div`
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-touch-callout: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle>
      <BrowserRouter>
        <Switch>
          <Route path='/auth/authorize'>
            <AuthAuthorize />
          </Route>
          <Route path='/debug'>
            <Debug />
          </Route>
          <Route path='/'>
            <RequiredAuth>
              <Route path='/level'>
                <Level />
              </Route>
              <Route path='/settings'>
                <Settings />
              </Route>
              <Route path='/notification'>
                <Notification />
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
              <Route path='/sidebar'>
                <Sidebar />
              </Route>
              <Route path='/secession'>
                <Secession />
              </Route>
              <Route path='/pay'>
                <Pay />
              </Route>
            </RequiredAuth>
          </Route>
        </Switch>
      </BrowserRouter>
    </GlobalStyle>
  </React.StrictMode>,
  document.getElementById('root')
);
