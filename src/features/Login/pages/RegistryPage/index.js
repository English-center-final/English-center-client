import { CloseCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  message,
  notification,
  Row,
  Tag,
  Typography,
} from 'antd';
import loginApi from 'api/loginApi';
import { fetchUserProfile, setLogin } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { registryValues } from 'features/Login/initValues';
import { setLoading } from 'features/Login/loginSlice';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import constants from 'utils/constants';
import IMAGE_ACCOUNT_PAGE from 'assets/images/account/US-ENGLISH.png';

import './main-page.scss';

const { Text, Title } = Typography;

RegistryPage.propTypes = {};

function RegistryPage() {
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.global);
  let resendOTPTimerInterval;
  const [isError, setError] = useState(false);
  const history = useHistory();
  //set time counter
  const [counter, setCounter] = useState(0);
  //set OTP value
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    document.title = 'Đăng ký';
  }, []);

  const openNotification = (mes) => {
    const args = {
      message: mes ? mes : 'Xác thực OTP để hoàn tất việc đăng ký',
    };
    notification.info(args);
  };

  const openSucessNotification = (mes) => {
    const args = {
      message: mes ? mes : 'Đăng ký thành công',
    };
    notification.success(args);
  };

  const handleRegistry = async (values) => {
    const { name, username, password, otp, phoneNumber } = values;
    console.log(values);
    dispatch(setLoading(true));
    if (isSubmit) {
      handleConfirmAccount(username, otp, password);
    } else {
      try {
        await loginApi.registry(name, username, password, phoneNumber);
        setIsSubmit(true);
        openNotification();
        setCounter(constants.RESEND_OTP_TIME_LIMIT);
        startResendOTPTimer();
      } catch (error) {
        message.error('Đã có lỗi xảy ra');
      }
    }
    dispatch(setLoading(false));
  };

  //start time from 30 to '0'
  const startResendOTPTimer = () => {
    if (resendOTPTimerInterval) {
      clearInterval(resendOTPTimerInterval);
    }
    resendOTPTimerInterval = setInterval(() => {
      if (counter <= 0) {
        clearInterval(resendOTPTimerInterval);
      } else {
        setCounter(counter - 1);
      }
    }, 1000);
  };

  const handleResendOTP = async (username) => {
    setCounter(constants.RESEND_OTP_TIME_LIMIT);
    startResendOTPTimer();
    dispatch(setLoading(true));
    try {
      await loginApi.resetOtp(username);
      openNotification(`Đã gửi lại mã OTP đến  ${username}`);
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
  };

  //useEffect khi counter thay đổi
  useEffect(() => {
    startResendOTPTimer();
    return () => {
      if (resendOTPTimerInterval) {
        clearInterval(resendOTPTimerInterval);
      }
    };
  }, [counter]);

  const handleConfirmAccount = async (username, otp, password) => {
    try {
      console.log('handle confirm');
      await loginApi.confirmAccount(username, otp);

      dispatch(setLoading(true));
      const { accessToken } = await loginApi.login(username, password);

      localStorage.setItem('kltn-token', accessToken);
      dispatch(fetchUserProfile());

      history.replace('/');
      openSucessNotification();
    } catch (error) {
      console.log('fail');
      message.error('OTP không hợp lệ');
    }
  };

  return (
    <div>
      {isLogin ? (
        <Redirect to="/" />
      ) : (
        <div className="account-common-page">
          <div className="account-wrapper">
            <div className="account_left">
              <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_forgot" />
            </div>
            <div className="account_right">
              <Title level={2} style={{ textAlign: 'center' }}>
                <Text style={{ color: '#4d93ff' }}>Đăng Ký</Text>
              </Title>
              <Divider />
              <div className="form-account">
                <Formik
                  initialValues={registryValues.initial}
                  onSubmit={handleRegistry}
                  validationSchema={
                    isSubmit
                      ? registryValues.validationSchemaWithOTP
                      : registryValues.validationSchema
                  }
                  enableReinitialize={true}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <Row gutter={[0, 16]}>
                          {isSubmit ? (
                            <>
                              <Col span={24}>
                                <FastField
                                  name="otp"
                                  component={InputField}
                                  type="text"
                                  title="Xác nhận OTP"
                                  placeholder="Mã OTP có 6 kí tự"
                                  maxLength={50}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>

                              <Col span={24}>
                                <Button
                                  onClick={() =>
                                    handleResendOTP(formikProps.values.username)
                                  }
                                  type="primary"
                                  block
                                  disabled={counter > 0 ? true : false}
                                >
                                  Gửi lại OTP{' '}
                                  {`${counter > 0 ? `sau ${counter}` : ''}`}
                                </Button>
                              </Col>

                              <Col span={24}>
                                <Button
                                  block
                                  type="primary"
                                  htmlType="submit"
                                  onClick={() =>
                                    handleRegistry(formikProps.values)
                                  }
                                >
                                  Xác nhận
                                </Button>
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col span={24}>
                                <FastField
                                  name="name"
                                  component={InputField}
                                  type="text"
                                  title="Tên "
                                  placeholder="Ví dụ: Nguyễn Văn A"
                                  maxLength={50}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>
                              <Col span={24}>
                                <FastField
                                  name="username"
                                  component={InputField}
                                  type="text"
                                  title="Tài khoản"
                                  placeholder="Nhập email/SĐT đăng ký"
                                  maxLength={50}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>
                              <Col span={24}>
                                <FastField
                                  name="phoneNumber"
                                  component={InputField}
                                  type="phoneNumber"
                                  title=" Số điện thoại"
                                  placeholder="Nhập vào số điện thoại"
                                  maxLength={200}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>
                              <Col span={24}>
                                <FastField
                                  name="password"
                                  component={InputField}
                                  type="password"
                                  title="Mật khẩu"
                                  placeholder="Mật khẩu ít nhất 8 kí tự"
                                  maxLength={200}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>
                              <Col span={24}>
                                <FastField
                                  name="passwordconfirm"
                                  component={InputField}
                                  type="password"
                                  title=" Xác nhận mật khẩu"
                                  placeholder="Gõ lại mật khẩu vừa nhập"
                                  maxLength={200}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>

                              <Col span={24}>
                                <Button block type="primary" htmlType="submit">
                                  Xác nhận
                                </Button>
                              </Col>
                            </>
                          )}

                          {isError ? (
                            <Col span={24}>
                              <Tag
                                color="error"
                                style={{
                                  fontWeight: 'bold',
                                }}
                                icon={<CloseCircleOutlined />}
                              >
                                {isError}
                              </Tag>
                            </Col>
                          ) : (
                            ''
                          )}
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </div>

              {/* <Divider /> */}

              <div className="addtional-link">
                <Link to="/">Trang chủ</Link>
                <Link to="/auth/login">Đăng nhập</Link>
                <Link to="/auth/forgot-password">Quên mật khẩu ?</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistryPage;
