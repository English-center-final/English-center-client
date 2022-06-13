import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, List, Typography, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Title } = Typography;

TestPartList.propTypes = {
  books: PropTypes.array,
  numberPart: PropTypes.string,
};

TestPartList.defaultProps = {
  books: [],
  numberPart: '1',
};

function TestPartList({ books, numberPart }) {
  const history = useHistory();
  const { isLogin } = useSelector((state) => state.global);

  const handleOnClick = (slug, numberPart) => {
    if (isLogin) {
      history.push(`/parts/test/${slug}/${numberPart}`);
    } else {
      Modal.warning({
        closable: true,
        maskClosable: true,
        centered: true,
        title: 'Bạn cần phải đăng nhập để sử dụng chức năng này',
      });
    }
  };

  return (
    <div className="test-part-list">
      <Row gutter={[24, 24]}>
        {books.map((bookEle, index) => {
          const { name, exams } = bookEle;

          return (
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              key={index}
            >
              <List
                header={<Title level={5}>{name}</Title>}
                bordered
                dataSource={exams}
                renderItem={(item, index) => (
                  <List.Item>
                    <Link
                      style={{ fontWeight: 'bold' }}
                      onClick={() => handleOnClick(item.slug, numberPart)}
                    >
                      {index + 1}. {`Part ${numberPart}`} - {item.name}
                    </Link>
                  </List.Item>
                )}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default TestPartList;
