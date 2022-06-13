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

function ClassesTable(props) {
  const { classes } = props;
  const { isLogin } = useSelector((state) => state.global);
  const { classRegister } = useSelector((state) => state.me);

  const dispatch = useDispatch();

  const isDisabled = (dateStart, status) => {
    const currentDate = new Date();
    const date = new Date(
      dateStart.replace(
        constants.StandardDate.PATTERN,
        constants.StandardDate.FORMAT
      )
    );

    if (
      status === constants.ClassStatus.ACCEPT.key ||
      status === constants.ClassStatus.CANCEL.key
    ) {
      return true;
    }
    return +currentDate > +date;
  };

  const isRegistered = (classId) => {
    if (isLogin) {
      if (classRegister.length === 0) {
        return false;
      } else {
        const classes = classRegister.find((ele) => ele.classesId === classId);

        if (
          classes &&
          classes?.status !== constants.UserClassStatus.CANCEL.key
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const handleRegistry = (classId) => {
    if (isLogin) {
      Modal.confirm({
        title: 'Bạn có muốn đăng ký lớp học này không?',
        icon: <ExclamationCircleOutlined />,
        content:
          'Khi đăng ký thành công, bạn không thể tự huỷ đăng ký lớp học này được',
        onOk: async () => {
          try {
            await classesApi.registerClass(classId);
            dispatch(fetchClassOfUser());
            message.success('Đăng ký thành công');
          } catch (error) {
            message.error('Không thể đăng ký');
          }
        },
        onCancel() {},
      });
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
    <Table
      dataSource={classes}
      pagination={false}
      rowKey={(record) => record.id}
      className="classes-table"
      style={{ height: '70vh' }}
      scroll={{ x: 'max-content', y: 'calc(70vh - 55px)' }}
    >
      <Column
        align="center"
        width="60px"
        title="STT"
        dataIndex="stt"
        key="stt"
      />
      <Column title="Mã lớp học" width="108px" dataIndex="id" key="id" />
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

      <Column title="Cơ sở" dataIndex="branchName" key="branchName" />
      <Column title="Địa chỉ" dataIndex="branchAddress" key="branchAddress" />
      <Column
        title="Trạng thái"
        dataIndex="status"
        key="status"
        render={(_, record) => {
          const status = commonFuc.getStatusObj(
            record.status,
            settings.constants.ClassStatus
          );
          return <Tag color={status.color}>{status.value}</Tag>;
        }}
      />
      <Column
        title="Đăng ký"
        key="action"
        align="center"
        render={(_, record) => {
          return isRegistered(record.id) ? (
            <Button className="btnDisable" type="primary" disabled={true}>
              Đã đăng ký
            </Button>
          ) : (
            <Button
              type="primary"
              className={
                isDisabled(record.dateStart, record.status)
                  ? 'btnDisable'
                  : 'btnConfirm'
              }
              disabled={isDisabled(record.dateStart, record.status)}
              onClick={() => handleRegistry(record.id)}
            >
              Đăng ký
            </Button>
          );
        }}
      />
    </Table>
  );
}

ClassesTable.propTypes = {
  classes: PropTypes.array,
  query: PropTypes.object,
};

ClassesTable.defaultProps = {
  classes: [],
};

export default ClassesTable;
