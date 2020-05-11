import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import AuthRouter from './pages/AuthRouter';
import Register from './pages/Register';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <Route path="/" exact component={AuthRouter} />
        </AuthProvider>
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
