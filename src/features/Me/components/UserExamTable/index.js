import { MoreOutlined } from '@ant-design/icons';
import { Button, Pagination, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { fetchBranches } from 'app/globalSlice';
import { fetchUserExam } from 'features/Me/meSlice';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import UserExamModal from '../UserExamModal';
import './style.scss';

function UserExamTable(props) {
  const { userExamPage } = useSelector((state) => state.me);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const [query, setQuery] = useState({
    page: 0,
    size: 10,
  });

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page - 1 });
  };

  const { data, page, totalPages } = userExamPage;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserExam(query));
  }, [query]);

  useEffect(() => {
    dispatch(fetchBranches());
  }, []);

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Table
          dataSource={commonFuc.addSTTForList(data, 0)}
          pagination={false}
          rowKey={(record) => record.id}
          className="classes-table"
        >
          <Column
            align="center"
            width="60px"
            title="STT"
            dataIndex="stt"
            key="stt"
          />
          <Column title="Bộ đề" dataIndex="bookName" key="bookName" />
          <Column title="Đề thi" dataIndex="examName" key="examName" />
          <Column
            title="Ngày làm"
            dataIndex="testDate"
            key="testDate"
            render={(_, record) => {
              const date = moment(new Date(record.testDate)).format(
                ' DD/MM/YYYY, HH:mm'
              );

              {
                return <span>{date}</span>;
              }
            }}
          />
          <Column
            title="Tổng điểm"
            key="total"
            render={(_, record) => {
              {
                return (
                  <span>{`${record.listenPoint + record.readPoint}/990`}</span>
                );
              }
            }}
          />
          {/* <Column
            title="Số lượng"
            // dataIndex="amount"
            // key="amount"
            render={(_, record) => (
              <span>{`${record.numOfRegister}/${record.amount}`}</span>
            )}
          /> */}
          <Column
            title="Chi tiết"
            dataIndex="details"
            key="details"
            render={(_, record) => {
              return (
                <Button
                  type="primary"
                  ghost
                  icon={<MoreOutlined />}
                  shape="circle"
                  onClick={() => {
                    setIsModalVisible(true);
                    setSelectedExam(record);
                  }}
                />
              );
            }}
          />
          {/* <Column
            title="Đăng ký"
            key="action"
            align="center"
            render={(_, record) => {
              return isRegistered(record.id) ? (
                <Button type="primary" disabled={true}>
                  Đã đăng ký
                </Button>
              ) : (
                <Button
                  type="primary"
                  disabled={isDisabled(record.dateStart, record.status)}
                  onClick={() => handleRegistry(record.id)}
                >
                  Đăng ký
                </Button>
              );
            }}
          /> */}
        </Table>
        <div style={{ textAlign: 'right' }}>
          <Pagination
            current={page + 1 || 1}
            total={totalPages * 10 || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </Space>

      <UserExamModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        data={selectedExam}
      />
    </>
  );
}

UserExamTable.propTypes = {
  classes: PropTypes.array,
  query: PropTypes.object,
};

UserExamTable.defaultProps = {
  classes: [],
};

export default UserExamTable;
