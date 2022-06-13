import { Col, Radio, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import PropTypes from 'prop-types';
import React from 'react';

GenderRadioField.propTypes = {
  field: PropTypes.object,
};

GenderRadioField.defaultProps = {
  field: null,
};

function GenderRadioField({ field }) {
  const { name, value } = field;

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };

    field.onChange(changeEvent);
  };

  return (
    <Row>
      <Col span={6}>
        <Text strong>Giói tính</Text>
      </Col>
      <Col span={18}>
        <Radio.Group value={value} onChange={handleChange}>
          <Radio key={false} value={false}>
            Nam
          </Radio>

          <Radio key={true} value={true}>
            Nữ
          </Radio>
        </Radio.Group>
      </Col>
    </Row>
  );
}

export default GenderRadioField;
