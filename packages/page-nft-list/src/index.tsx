import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import List from './List';
import MyCollection from './MyCollection';
import { useEagerConnect } from '@horse-racing/react-wallet';

const NftList: React.FC = () => {
  const { path } = useRouteMatch();
  useEagerConnect()
  return (
    <Switch>
      <Route exact path={`${path}/:id`}>
        <List />
      </Route>
      <Route exact path={`${path}`}>
        <MyCollection />
      </Route>
    </Switch>
  );
};

export default NftList;
