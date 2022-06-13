import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';

function Classes() {
  const { isLoading } = useSelector((state) => state.classes);

  const { url } = useRouteMatch();

  return (
    <Spin spinning={isLoading}>
      <div>
        <Switch>
          <Route exact path={`${url}`} component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Spin>
  );
}
Classes.propTypes = {};
Classes.defaultProps = {};

export default Classes;
