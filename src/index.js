import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { RequiredAuth, Setting } from '.';
import { AuthAuthorize } from './pages/auth/Authorize';

export * from './components';
export * from './pages';
export * from './tools';

export const baseURL = 'https://coreservice.staging.hikick.kr/v1';

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <BrowserRouter>
      <Switch>
        <Route path="/auth/authorize">
          <AuthAuthorize />
        </Route>
        <Route path="/">
          <RequiredAuth>
            <Route path="/settings">
              <Setting />
            </Route>
          </RequiredAuth>
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
