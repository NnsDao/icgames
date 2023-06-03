import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import BlindBox from '@horse-racing/page-blind-box';
import Home from '@horse-racing/page-home';
import Market from '@horse-racing/page-market';
import Rank from '@horse-racing/page-market/Rank';
import NftList from '@horse-racing/page-nft-list';
import { HeaderProvider } from '@horse-racing/react-components';
import ScrollToTop from '@horse-racing/react-components/ScrollToTop';

import Create from './Create';
import Footer from './Footer';
import Header from './Header';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <Switch>
        <Route path="/myCollection">
          <NftList />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/rank">
          <Rank />
        </Route>
        <Route path="/explore">
          <Market />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </HashRouter>
  );
};

export default App;
