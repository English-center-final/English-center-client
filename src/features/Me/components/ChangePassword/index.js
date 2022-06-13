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
  Space,
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
import './main-page.scss';
import * as Yup from 'yup';

const { Text, Title } = Typography;

ChangePassword.propTypes = {};

function ChangePassword() {
  const dispatch = useDispatch();

  const { isLogin, user } = useSelector((state) => state.global);
  let resendOTPTimerInterval;
  const [isError, setError] = useState(false);
  const history = useHistory();
  //set time counter
  const [counter, setCounter] = useState(0);
  //set OTP value
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Mật khẩu không được bỏ trống')
      .min(8, 'Mật khẩu phải từ 8-50 ký tự')
      .max(50, 'Mật khẩu phải từ 8-50 ký tự'),
    passwordconfirm: Yup.string()
      .required('không được bỏ trống')
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    otp: Yup.string()
      .trim()
      .required('OTP không được bỏ trống.')
      .matches(/^\d{6}$/, 'OTP phải đủ 6 chữ số'),
  });

  const openNotification = (mes) => {
    const args = {
      message: mes ? mes : 'Xác thực OTP để hoàn tất việc đăng ký',
    };
    notification.info(args);
  };

  const handleSubmit = async (values) => {
    const { password, otp } = values;
    dispatch(setLoading(true));
    handleConfirmAccount(password, +otp);
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

  const handleResendOTP = async () => {
    setCounter(constants.RESEND_OTP_TIME_LIMIT);
    startResendOTPTimer();
    dispatch(setLoading(true));
    try {
      await loginApi.resetOtp(user.username);
      openNotification(`Đã gửi lại mã OTP đến  ${user.username}`);
    } catch (error) {
      console.error(error);
    }
    dispatch(setLoading(false));
    if (!isSubmit) {
      setIsSubmit(true);
    }
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

  const handleConfirmAccount = async (password, otp) => {
    try {
      await loginApi.confirmPassword(user.username, password, otp);

      history.replace('/auth/login');
      notification.success('Đổi mật khẩu thành công');
    } catch (error) {
      console.log('fail');
      message.error('OTP không hợp lệ');
    }
  };

  return (
    <div>
      <Formik
        initialValues={forgotValues.initial}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {(formikProps) => {
          return (
            <Form layout="horizontal">
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <FastField
                    name="password"
                    component={InputField}
                    type="password"
                    title="Mật khẩu"
                    placeholder="Mật khẩu ít nhất 8 kí tự"
                    maxLength={200}
                    titleCol={6}
                    inputCol={18}
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
                    titleCol={6}
                    inputCol={18}
                  />
                </Col>

                <Col span={24}>
                  <FastField
                    name="otp"
                    component={InputField}
                    type="text"
                    title="Xác nhận OTP"
                    placeholder="Mã OTP có 6 kí tự"
                    maxLength={6}
                    titleCol={6}
                    inputCol={18}
                  />
                </Col>

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

                <Col span={24}>
                  <Row gutter={[0, 16]}>
                    <Col offset={6} span={4}>
                      <Button
                        onClick={() => handleResendOTP(user.username)}
                        type="primary"
                        className="btnConfirm"
                        block
                        disabled={counter > 0 ? true : false}
                      >
                        {isSubmit ? 'Gửi lại OTP' : 'Gửi OTP'}
                        {/* {isSubmit
                          ? `Gửi lại OTP ${
                              counter > 0 ? `sau ${counter} giây` : ''
                            }`
                          : 'Gửi OTP'} */}
                      </Button>
                    </Col>
                    <Col
                      offset={1}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {counter > 0 && (
                        <Text style={{ color: 'red' }}>
                          {`Gửi lại OTP ${
                            counter > 0 ? `sau ${counter} giây` : ''
                          }`}
                        </Text>
                      )}
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col offset={6} span={4}>
                      <Button
                        className="btnConfirm"
                        htmlType="submit"
                        type="primary"
                        block
                      >
                        Xác nhận
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ChangePassword;
