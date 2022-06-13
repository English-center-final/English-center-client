import { Button, Col, Divider, Row, Typography } from 'antd';
import loginApi from 'api/loginApi';
import { fetchUserProfile, setLogin } from 'app/globalSlice';
import TagCustom from 'components/TagCustom';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Login/loginSlice';
import { fetchClassOfUser } from 'features/Me/meSlice';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import IMAGE_ACCOUNT_PAGE from 'assets/images/account/US-ENGLISH.png';
import './main-page.scss';

const { Text, Title } = Typography;

MainPage.propTypes = {};

const initialValues = {
  username: '',
  password: '',
};

function MainPage() {
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state) => state.global);
  const [isError, setError] = useState(false);

  useEffect(() => {
    document.title = 'Đăng nhập';
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Tài khoản không được bỏ trống.'),
    password: Yup.string().required('Mật khẩu không được bỏ trống'),
  });

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      dispatch(setLoading(true));
      const { accessToken } = await loginApi.login(username, password);

      localStorage.setItem('kltn-token', accessToken);
      dispatch(fetchUserProfile());
      dispatch(fetchClassOfUser());
    } catch (error) {
      setError(true);
    }

    dispatch(setLoading(false));
  };

  return (
    <div>
      {isLogin === true ? (
        <Redirect to="/" />
      ) : (
        <div className="account-common-page">
          <div
            className="account-wrapper"
            style={{ minHeight: '60vh', marginTop: '-110px' }}
          >
            <div className="account_left">
              <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login" />
            </div>

            <div className="account_right">
              <Title level={2} style={{ textAlign: 'center' }}>
                <Text style={{ color: '#4d93ff' }}>Đăng Nhập</Text>
              </Title>
              <Divider />
              <div className="form-account">
                <Formik
                  initialValues={{ ...initialValues }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                  enableReinitialize={true}
                >
                  {(formikProps) => {
                    return (
                      <Form>
                        <Row gutter={[0, 8]}>
                          <Col span={24}>
                            <FastField
                              name="username"
                              component={InputField}
                              type="text"
                              title="Tài khoản"
                              placeholder="Nhập tài khoản"
                              maxLength={50}
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
                              placeholder="Nhập mật khẩu"
                              maxLength={200}
                              titleCol={24}
                              inputCol={24}
                            />
                          </Col>
                          {isError && (
                            <Col offset={8} span={16}>
                              <TagCustom
                                title="Tài khoản không hợp lệ"
                                color="error"
                              />
                            </Col>
                          )}

                          <Col span={24}>
                            <br />
                            <Button type="primary" htmlType="submit" block>
                              Đăng nhập
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              {/* <Divider /> */}
              <div className="addtional-link">
                <Link to="/">Trang chủ</Link>
                <Link to="/auth/forgot-password">Quên mật khẩu</Link>
                <Link to="/auth/registry">Bạn chưa có tài khoản ?</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
