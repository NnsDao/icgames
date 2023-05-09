import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Artdetail from './Artdetail';
import Artworks from './Artworks';
import Markets from './Markets';
import Rank from './Rank';

const Market: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Markets />
      </Route>
      <Route exact path={`${path}/artworks/:id`}>
        <Artworks />
      </Route>
      <Route exact path={`${path}/artDetail/:id`}>
        <Artdetail />
      </Route>
      <Route exact path={'/rank'}>
        <Rank />
      </Route>
    </Switch>
  );
};

export default Market;
