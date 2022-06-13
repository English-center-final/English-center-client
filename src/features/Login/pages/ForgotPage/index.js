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
import InputField from 'customfield/InputField';
import { forgotValues } from 'features/Login/initValues';
import { setLoading } from 'features/Login/loginSlice';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import constants from 'utils/constants';
import IMAGE_ACCOUNT_PAGE from 'assets/images/account/US-ENGLISH.png';
// import './main-page.scss';

const { Text, Title } = Typography;

ForgotPage.propTypes = {};

function ForgotPage() {
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
    document.title = 'Quên mật khẩu';
  }, []);

  const openNotification = (mes) => {
    const args = {
      message: mes ? mes : 'Xác thực OTP để hoàn tất việc đăng ký',
    };
    notification.info(args);
  };

  const handleSubmit = async (values) => {
    const { username, password, otp } = values;
    console.log(values);
    dispatch(setLoading(true));
    if (isSubmit) {
      // if

      handleConfirmAccount(username, password, +otp);
    } else {
      try {
        await loginApi.resetOtp(username);
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

  const handleConfirmAccount = async (username, password, otp) => {
    try {
      await loginApi.confirmPassword(username, password, otp);

      history.replace('/auth/login');
      notification.success('Đổi mật khẩu thành công');
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
          <div
            className="account-wrapper"
            style={{ minHeight: '60vh', marginTop: '-110px' }}
          >
            <div className="account_left">
              <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_forgot" />
            </div>
            <div className="account_right">
              <Title level={2} style={{ textAlign: 'center' }}>
                <Text style={{ color: '#4d93ff' }}>Quên Mật Khẩu</Text>
              </Title>
              <Divider />
              <div className="form-account">
                <Formik
                  initialValues={forgotValues.initial}
                  onSubmit={handleSubmit}
                  validationSchema={
                    isSubmit
                      ? forgotValues.validationSchema
                      : forgotValues.validationSchemaUser
                  }
                  enableReinitialize={true}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <Row gutter={[0, 16]}>
                          {/* <Col span={24}>
                            <Text
                              style={{
                                color: '#08aeea',
                                textAlign: 'center',
                              }}
                            >
                              Nhập email/SĐT để nhận mã xác thực
                            </Text>
                          </Col> */}

                          {isSubmit ? (
                            <>
                              <Col span={24}>
                                <FastField
                                  name="password"
                                  component={InputField}
                                  type="password"
                                  title="Mật khẩu mới"
                                  placeholder="Nhập mật khẩu"
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
                                  title=" Xác Nhận Mật khẩu"
                                  placeholder="Xác nhận mật khẩu"
                                  maxLength={200}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>
                              <Col span={24}>
                                <FastField
                                  name="otp"
                                  component={InputField}
                                  type="text"
                                  title="Xác nhận"
                                  placeholder="Nhập 6 ký tự OTP"
                                  maxLength={50}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>

                              <Col span={24}>
                                <Button
                                  block
                                  type="primary"
                                  disabled={counter > 0 ? true : false}
                                  onClick={() =>
                                    handleResendOTP(formikProps.values.username)
                                  }
                                >
                                  Gửi lại OTP{' '}
                                  {`${counter > 0 ? `sau ${counter}` : ''}`}
                                </Button>
                              </Col>

                              <Col span={24}>
                                <Button block type="primary" htmlType="submit">
                                  Xác nhận
                                </Button>
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col span={24}>
                                <FastField
                                  name="username"
                                  component={InputField}
                                  type="text"
                                  title="Nhập email để nhận mã xác thực"
                                  placeholder="Nhập tài khoản"
                                  maxLength={50}
                                  titleCol={24}
                                  inputCol={24}
                                />
                              </Col>
                              <Col span={24}>
                                <Button htmlType="submit" block type="primary">
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
                <Link to="/auth/registry">Bạn chưa có tài khoản ?</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPage;
