import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { classesApi } from 'api';
import settings from 'app/settings';
import { fetchClassOfUser } from 'features/Me/meSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import constants from 'utils/constants';
import './style.scss';

function ClassRegisterTable(props) {
  const { classRegister } = useSelector((state) => state.me);

  const dispatch = useDispatch();

  return (
    <Table
      dataSource={commonFuc.addSTTForList(classRegister, 0)}
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
      <Column title="Mã lớp học" dataIndex="classesId" key="classesId" />
      <Column title="Khoá học" dataIndex="levelName" key="levelName" />
      <Column title="Lịch Khai giảng" dataIndex="dateStart" key="dateStart" />
      <Column
        title="Thời gian học"
        dataIndex="date"
        key="date"
        render={(_, record) => {
          {
            const session = record.session || 1;
            const time = constants.SESSION[+session].time;
            return (
              <span>
                {`Ca ${session} (${time}), ${commonFuc
                  .toVietnamDay(record.date)
                  .join(', ')}`}
              </span>
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
        title="Trạng thái"
        dataIndex="status"
        key="status"
        render={(_, record) => {
          const status = commonFuc.getStatusObj(
            record.status,
            settings.constants.UserClassStatus
          );
          return <Tag color={status?.color}>{status?.value}</Tag>;
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
  );
}

ClassRegisterTable.propTypes = {
  classes: PropTypes.array,
  query: PropTypes.object,
};

ClassRegisterTable.defaultProps = {
  classes: [],
};

export default ClassRegisterTable;
