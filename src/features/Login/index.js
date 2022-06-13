import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import MainPage from 'features/Login/pages/MainPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ForgotPage from './pages/ForgotPage';
import RegistryPage from './pages/RegistryPage';
import './style.scss';
function Login() {
  const { isLoading } = useSelector((state) => state.login);
  const { url } = useRouteMatch();

  return (
    <Spin spinning={isLoading}>
      <div id="account_page">
        <Switch>
          <Route exact path={`${url}/login`} component={MainPage} />
          <Route exact path={`${url}/registry`} component={RegistryPage} />
          <Route exact path={`${url}/forgot-password`} component={ForgotPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Spin>
  );
}

export default Login;
