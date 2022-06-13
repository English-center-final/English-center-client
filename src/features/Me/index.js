import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';

function Me() {
  const { isLoading } = useSelector((state) => state.me);
  const match = useRouteMatch();
  const { url } = match;

  return (
    <Spin spinning={isLoading}>
      <div>
        <Switch>
          <Route exact path={url} component={MainPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Spin>
  );
}

export default Me;
