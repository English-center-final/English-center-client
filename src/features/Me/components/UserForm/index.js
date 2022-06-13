import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { FastField, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, message, Row } from 'antd';
import InputField from 'customfield/InputField';
import GenderRadioField from 'customfield/GenderRadioField';
import * as Yup from 'yup';
import { setLoading } from 'features/Me/meSlice';
import { fetchUserProfile } from 'app/globalSlice';
import { meApi } from 'api';

const UserForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên không được bỏ trống.'),
    phoneNumber: Yup.string()
      .required('Số điện thoại không được bỏ trống.')
      .matches(
        /((09|03|07|08|05)+([0-9]{8})\b)/i,
        'Số điện thoại  không hợp lệ'
      ),
  });

  const handleSubmit = async (values) => {
    const { id, name, phoneNumber, gender } = values;

    try {
      dispatch(setLoading(true));
      await meApi.updateUser({ id: +id, name, phoneNumber, gender });

      dispatch(fetchUserProfile());
      message.success('Cập nhật thành công');
    } catch (error) {
      message.error('Đã có lỗi xảy ra');
    }

    dispatch(setLoading(false));
  };
  return (
    <div>
      <Formik
        initialValues={{ ...user }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {() => {
          return (
            <Form layout="horizontal">
              <Row gutter={[0, 16]}>
                <Col span={24}>
                  <FastField
                    name="name"
                    component={InputField}
                    type="text"
                    title="Họ và tên"
                    placeholder="Nhập họ và tên"
                    maxLength={50}
                    titleCol={6}
                    inputCol={18}
                  />
                </Col>

                <Col span={24}>
                  <FastField
                    name="username"
                    component={InputField}
                    disabled={true}
                    title="Email"
                    placeholder="Email"
                    inputCol={18}
                    titleCol={6}
                  />
                </Col>

                <Col span={24}>
                  <FastField
                    name="phoneNumber"
                    component={InputField}
                    type="text"
                    title="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    maxLength={50}
                    titleCol={6}
                    inputCol={18}
                  />
                </Col>

                <Col span={24}>
                  <FastField name="gender" component={GenderRadioField} />
                </Col>

                <Col offset={6}>
                  <Button
                    className="btnConfirm"
                    type="primary"
                    htmlType="submit"
                  >
                    Cập nhật
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

UserForm.propTypes = {};

export default UserForm;
