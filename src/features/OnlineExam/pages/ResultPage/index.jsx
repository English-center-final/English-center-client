import { HomeOutlined, StarTwoTone } from '@ant-design/icons';
import { Button, Space, Spin, Table } from 'antd';
import {
  fetchResult,
  refreshStore,
  setExamSelected,
  setScrollId,
  setsubPartSelected,
} from 'features/OnlineExam/onlineExamSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { handleAnswer } from 'utils/handleDataAnswer';
import './style.scss';
ResultPage.propTypes = {};

function ResultPage(props) {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const { answers, result, isLoading } = useSelector((state) => state.exam);
  const {
    listenPoint,
    readPoint,
    listenNumber,
    readNumber,
    part1Number,
    part2Number,
    part3Number,
    part4Number,
    part5Number,
    part6Number,
    part7Number,
  } = result;
  const answerToPost = handleAnswer(answers);
  const history = useHistory();

  useEffect(() => {
    dispatch(
      fetchResult({
        slug: testId,
        answers: answerToPost,
      })
    );
  }, []);

  useEffect(() => {
    document.getElementById('top').scrollIntoView();
  }, []);

  const handleDetailClick = (text, record, index) => {
    localStorage.setItem('partSelected', record.key);
    dispatch(setExamSelected(record.key));
    dispatch(setsubPartSelected(0));
    dispatch(setScrollId('top'));
    history.push(`/exams/${testId}/examining`);
  };

  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },

    {
      title: 'Số câu đúng',
      dataIndex: 'correct',
      key: 'correct',
      render: (selected) => <span style={{ color: 'red' }}>{selected}</span>,
    },

    {
      title: '',
      dataIndex: 'detail',
      key: 'detail',
      render: (text, record, index) => (
        <a onClick={() => handleDetailClick(text, record, index)}>{text}</a>
      ),
    },
  ];

  const data_listening = [
    {
      key: '1',
      question: '1 - 6',
      description: 'Part I: Picture Description',
      correct: `${part1Number || '0'}/6`,
      detail: 'Chi tiết',
    },
    {
      key: '2',
      question: '7 - 31',
      description: 'Part II: Question - Response',
      correct: `${part2Number || '0'}/25`,
      detail: 'Chi tiết',
    },
    {
      key: '3',
      question: '32 - 70',
      description: 'Part III: Short Conversations',
      correct: `${part3Number || '0'}/39`,
      detail: 'Chi tiết',
    },
    {
      key: '4',
      question: '71 - 100',
      description: 'Part IV: Short Talks',
      correct: `${part4Number || '0'}/30`,
      detail: 'Chi tiết',
    },
  ];

  const data_reading = [
    {
      key: '5',
      question: '101 - 130',
      description: 'Part V: Incomplete Sentences ',
      correct: `${part5Number || '0'}/30`,
      detail: 'Chi tiết',
    },
    {
      key: '6',
      question: '131 - 146',
      description: 'Part VI: Incomplete Sentences ',
      correct: `${part6Number || '0'}/16`,
      detail: 'Chi tiết',
    },
    {
      key: '7',
      question: '147 - 200',
      description: 'Part VII: Reading Comprehension',
      correct: `${part7Number || '0'}/54`,
      detail: 'Chi tiết',
    },
  ];

  const handleExitClick = () => {
    dispatch(refreshStore());
    history.push('/');
  };

  return (
    <Spin spinning={isLoading}>
      <div id="top">
        <div className="result_wrapper">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div className="result_infomation">
              <span className="result_title_test">ETS TOEIC TEST</span>
              <span className="result_info_additional">
                {/* Thank you for completing the trial tests on TOEIC Exam Store. */}
                Cảm ơn bạn đã hoàn thành các bài thi thử trên Kho luyện thi
                TOEIC.
              </span>
            </div>

            <div className="result_total_score">
              <span>
                {' '}
                <StarTwoTone /> Tổng điểm:{' '}
              </span>
              <span>{listenPoint + readPoint || ''}</span>
            </div>

            <div className="result_listening">
              <div className="result_header">
                <span className="topic">
                  Listening{listenNumber ? `(${listenNumber}/100)` : ''}
                </span>
                <span className="topic sub-score">
                  Điểm: {listenPoint ? `${listenPoint}/495` : ''}
                </span>
              </div>

              <Table
                dataSource={data_listening}
                columns={columns}
                pagination={false}
                scroll={{ x: true }}
              />
            </div>

            <div className="result_reading">
              <div className="result_header">
                <span className="topic">
                  Reading{readNumber ? `(${readNumber}/100)` : ''}
                </span>
                <span className="topic sub-score">
                  Điểm: {readPoint ? `${readPoint}/495` : ''}
                </span>
              </div>
              <Table
                dataSource={data_reading}
                columns={columns}
                pagination={false}
                scroll={{ x: true }}
              />
            </div>

            <div className="result_button">
              <Button
                type="primary"
                onClick={handleExitClick}
                icon={<HomeOutlined />}
                size="large"
                style={{ padding: '0 3rem' }}
              >
                Trang chủ
              </Button>
            </div>
          </Space>
        </div>
      </div>
    </Spin>
  );
}

export default ResultPage;
