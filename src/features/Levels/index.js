import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';

function Level() {
  const { isLoading } = useSelector((state) => state.level);

  const { url } = useRouteMatch();

  return (
    <Spin spinning={isLoading}>
      <div>
        <Switch>
          <Route exact path={`${url}/:slug`} component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Spin>
  );
}
Level.propTypes = {};
Level.defaultProps = {};

export default Level;
