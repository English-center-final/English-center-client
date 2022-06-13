import { Result } from 'antd';
import React, { useEffect } from 'react';
import './style.scss';

NotFoundPage.propTypes = {};

function NotFoundPage() {
  useEffect(() => {
    document.title = '404 page not found';
  }, []);
  return (
    <div id="not-found-page">
      <div className="main">
        <Result status="404" title="404" subTitle="Page not found" />
      </div>
    </div>
  );
}

export default NotFoundPage;
