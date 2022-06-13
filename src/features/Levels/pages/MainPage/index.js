import { FileTextOutlined } from '@ant-design/icons';
import { Col, Result, Row } from 'antd';
import imageNotFound from 'assets/images/image-not-found.svg';
import BackToTopButton from 'components/BackToTopButton';
import { fetchLevelBySlug } from 'features/Levels/levelSlice';
import Parser from 'html-react-parser';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import REGISTER_IMAGE from 'assets/images/dang-ky-ngay.gif';
import './style.scss';

function MainPage() {
  const { slug } = useParams();

  const { level } = useSelector((state) => state.level);

  const { domToReact } = Parser;
  const style = require('style-to-object');

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = level?.name || 'Level';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchLevelBySlug(slug));
  }, [slug]);

  return (
    <div id="level-detail-page">
      {level && Object.keys(level).length > 0 ? (
        <>
          <Row justify="center" className="level-thumbnail">
            <img
              src={level?.image || ''}
              alt={level?.name}
              onError={(e) => (e.target.src = imageNotFound)}
            />
            <div className="level-thumbnail__overlay">
              <div className="level-thumbnail__title">{level?.name}</div>
              <div className="level-thumbnail__description">
                {level?.description}
              </div>
              <div className="level-thumbnail__word-count">
                <FileTextOutlined />
                &nbsp;&nbsp;
                {level?.createDate}
              </div>
            </div>
          </Row>
          <Row justify="center">
            <Col span={16}>
              <Link to="/classes">
                <img
                  src={REGISTER_IMAGE}
                  alt="Oops ... Not found"
                  onError={(e) => (e.target.src = imageNotFound)}
                />
              </Link>
              <div className="content-blog">
                {level?.content &&
                  Parser(level?.content, {
                    replace: (domNode) => {
                      if (domNode.attribs && domNode.attribs.style) {
                        try {
                          style(domNode.attribs.style);
                        } catch (error) {
                          // delete the attribute that's causing the error
                          // then convert the dom node to react
                          delete domNode.attribs.style;
                          return domToReact(domNode);
                        }
                      }
                    },
                  })}
              </div>
            </Col>
          </Row>
          <BackToTopButton />
        </>
      ) : (
        <Result status="404" title="không tìm thấy" />
      )}
    </div>
  );
}
MainPage.propTypes = {};
MainPage.defaultProps = {};

export default MainPage;
