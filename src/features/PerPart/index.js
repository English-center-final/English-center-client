import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FinishPage from './pages/FinishPage';
import MainPage from './pages/MainPage';
import TestPage from './pages/TestPage';

PerPart.propTypes = {};

function PerPart() {
  const { isLoading } = useSelector((state) => state.perPart);
  const { url } = useRouteMatch();

  return (
    <Spin spinning={isLoading}>
      <div>
        <Switch>
          <Route exact path={`${url}/:numberPart`} component={MainPage} />
          <Route
            exact
            path={`${url}/test/:examSlug/:numberPart`}
            component={TestPage}
          />
          <Route
            path={`${url}/test/:examSlug/:numberPart/finish`}
            component={FinishPage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Spin>
  );
}

export default PerPart;
