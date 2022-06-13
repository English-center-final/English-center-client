import NotFoundPage from 'components/NotFoundPage';
import MainPage from 'features/Home/pages/MainPage';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

Home.propTypes = {};

function Home() {
  const { url } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={url} component={MainPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default Home;
