import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Detail from './Detail';
import List from './List';

const BlindBox: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:pid`}>
        <Detail />
      </Route>
      <Route exact path={`${path}`}>
        <List />
      </Route>
    </Switch>
  );
};

export default BlindBox;
