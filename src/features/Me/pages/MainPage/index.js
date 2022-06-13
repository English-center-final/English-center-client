import {
  CameraOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Image, Menu, message, Row } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { setLogin } from 'app/globalSlice';
import imageNotFound from 'assets/images/image-not-found.svg';
import ChangePassword from 'features/Me/components/ChangePassword';
import ClassRegisterTable from 'features/Me/components/ClassRegisterTable';
import UserExamTable from 'features/Me/components/UserExamTable';
import UserForm from 'features/Me/components/UserForm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import auth from 'utils/auth';
import './style.scss';

MainPage.propTypes = {};

function MainPage() {
  useEffect(() => {
    document.title = 'Tài khoản';
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.global);

  const menuItems = [
    {
      key: 'me',
      value: 'Thông tin cá nhân',
      icon: <UserOutlined />,
      content: <UserForm />,
    },
    {
      key: 'classes',
      value: 'Các khoá học đã đăng ký',
      icon: <InfoCircleOutlined />,
      content: <ClassRegisterTable />,
    },
    {
      key: 'exam',
      value: 'Lịch sử làm bài',
      icon: <FormOutlined />,
      content: <UserExamTable />,
    },
    {
      key: 'password',
      value: 'Đổi mật khẩu',
      icon: <LockOutlined />,
      content: <ChangePassword />,
    },
    {
      key: 'logout',
      value: 'Đăng xuất',
      icon: <LogoutOutlined />,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  const handleOnClick = (e) => {
    if (e.key === 'logout') {
      confirm({
        title: 'Bạn có muốn đăng xuất không?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Đăng xuất',
        cancelText: 'Huỷ',
        onOk() {
          auth.logout(() => {
            message.success('Bạn đã đăng xuất');
            dispatch(setLogin(false));
          });
        },
        onCancel() {},
      });
    } else {
      const item = menuItems.find((ele) => ele.key === e.key);
      setSelectedItem(item);
    }
  };

  return (
    <div id="user-main-page">
      <div className="user-container">
        <Row
          style={{ width: '100%' }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="user-wrapper user-wrapper__navbar">
              <Row className="user__info">
                <Col span={8}>
                  <div className="avatar">
                    <Avatar
                      size={60}
                      icon={
                        <Image
                          width={60}
                          src={user?.image || imageNotFound}
                          onError={(e) => (e.target.src = imageNotFound)}
                        />
                      }
                    />
                    <Button
                      className="edit-btn"
                      type="ghost"
                      shape="circle"
                      style={{
                        backgroundColor: '#0c4d8c',
                      }}
                      icon={
                        <CameraOutlined
                          style={{ color: '#fff', fontSize: '14px' }}
                        />
                      }
                    />
                  </div>
                </Col>
                <Col span={16}>
                  <Row>
                    <h2>{user?.name}</h2>
                  </Row>
                  <Row>{user?.username}</Row>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Menu
                    mode="vertical"
                    theme="light"
                    onClick={handleOnClick}
                    selectedKeys={selectedItem.key}
                    defaultSelectedKeys={[selectedItem.key]}
                  >
                    {menuItems.map((ele) => (
                      <Menu.Item
                        className="default"
                        key={ele.key}
                        icon={ele.icon}
                      >
                        {ele.value}
                      </Menu.Item>
                    ))}
                  </Menu>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16}>
            <div className="user-wrapper user-wrapper__information">
              <div className="user-information">
                <div className="user-information__header">
                  <h2>{selectedItem.value}</h2>
                </div>
                <div className="user-information__content">
                  {selectedItem.content}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MainPage;
