import {
  CheckOutlined,
  CloseOutlined,
  WarningTwoTone,
} from '@ant-design/icons';
import { Radio, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

LongSub.propTypes = {
  data: PropTypes.array,
  onAnswerSheetClick: PropTypes.func,
  name: PropTypes.string,
};

LongSub.defaultProps = {
  data: [],
  onAnswerSheetClick: null,
  name: '',
};

function LongSub(props) {
  const { answers, scrollId, isSubmit, transcript } = useSelector(
    (state) => state.exam
  );
  const { data, onAnswerSheetClick, name } = props;

  useEffect(() => {
    document.getElementById(`${scrollId}`).scrollIntoView();
  }, [scrollId]);

  function handleSelected(question, e) {
    const answer = {
      question: question,
      selected: e.target.value,
    };
    if (onAnswerSheetClick) {
      onAnswerSheetClick(answer);
    }
  }

  const renderQuestionAnswer = (char, content, result, answer) => {
    return (
      <div>
        {result === char ? (
          <Text strong underline type="success">
            {content} <CheckOutlined />
          </Text>
        ) : answer === char ? (
          <Text type="danger">
            {content} <CloseOutlined />
          </Text>
        ) : (
          <Text>{content}</Text>
        )}
      </div>
    );
  };
  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {data.map((question, index) => (
          <Space direction="vertical" key={index}>
            <div id={question.stt}>
              {question.stt}. {question.content} &nbsp;
              {answers[question.stt - 1].selected === '' && isSubmit ? (
                <Text type="warning">
                  <WarningTwoTone twoToneColor="#f1b815" /> Chưa chọn đáp án
                </Text>
              ) : (
                ''
              )}
            </div>

            {isSubmit ? (
              <Space direction="vertical">
                {renderQuestionAnswer(
                  'a',
                  answers[question.stt - 1].scriptAudio.a,
                  answers[question.stt - 1].result,
                  answers[question.stt - 1].selected.toLowerCase()
                )}
                {renderQuestionAnswer(
                  'b',
                  answers[question.stt - 1].scriptAudio.b,
                  answers[question.stt - 1].result,
                  answers[question.stt - 1].selected.toLowerCase()
                )}
                {renderQuestionAnswer(
                  'c',
                  answers[question.stt - 1].scriptAudio.c,
                  answers[question.stt - 1].result,
                  answers[question.stt - 1].selected.toLowerCase()
                )}
                {renderQuestionAnswer(
                  'd',
                  answers[question.stt - 1].scriptAudio.d,
                  answers[question.stt - 1].result,
                  answers[question.stt - 1].selected.toLowerCase()
                )}
              </Space>
            ) : (
              <Radio.Group
                onChange={(e) => handleSelected(question.stt, e)}
                value={answers[question.stt - 1].selected}
              >
                <Space direction="vertical">
                  <Radio value={'A'}>Option A</Radio>
                  <Radio value={'B'}>Option B</Radio>
                  <Radio value={'C'}>Option C</Radio>
                  <Radio value={'D'}>Option D</Radio>
                </Space>
              </Radio.Group>
            )}
          </Space>
        ))}
      </Space>
    </div>
  );
}

export default LongSub;
