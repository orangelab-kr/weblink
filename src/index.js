import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import { AuthAuthorize, RequiredAuth, Setting } from '.';

export * from './components';
export * from './pages';
export * from './tools';

export const baseURL =
  window.location.host === 'weblink.hikick.kr'
    ? 'https://coreservice.hikick.kr/v1'
    : 'https://coreservice.staging.hikick.kr/v1';

const GlobalStyle = styled.div`
  * {
    user-select: none;
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
          <Route path="/auth/authorize">
            <AuthAuthorize />
          </Route>
          <Route path="/">
            <RequiredAuth>
              <Route path="/setting">
                <Setting />
              </Route>
            </RequiredAuth>
          </Route>
        </Switch>
      </BrowserRouter>
    </GlobalStyle>
  </React.StrictMode>,
  document.getElementById('root')
);
