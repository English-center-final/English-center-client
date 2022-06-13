import { EditOutlined, StarTwoTone } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function UserExamModal(props) {
  const { isModalVisible, setIsModalVisible, data } = props;

  const history = useHistory();

  const handleCancel = () => {
    setIsModalVisible(false);
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
  ];

  const data_listening = [
    {
      key: '1',
      question: '1 - 6',
      description: 'Part I: Picture Description',
      correct: `${data?.partResult[0]}/6`,
    },
    {
      key: '2',
      question: '7 - 31',
      description: 'Part II: Question - Response',
      correct: `${data?.partResult[1]}/25`,
    },
    {
      key: '3',
      question: '32 - 70',
      description: 'Part III: Short Conversations',
      correct: `${data?.partResult[2]}/39`,
    },
    {
      key: '4',
      question: '71 - 100',
      description: 'Part IV: Short Talks',
      correct: `${data?.partResult[3]}/30`,
    },
  ];

  const data_reading = [
    {
      key: '5',
      question: '101 - 130',
      description: 'Part V: Incomplete Sentences ',
      correct: `${data?.partResult[4]}/30`,
    },
    {
      key: '6',
      question: '131 - 146',
      description: 'Part VI: Incomplete Sentences ',
      correct: `${data?.partResult[5]}/16`,
    },
    {
      key: '7',
      question: '147 - 200',
      description: 'Part VII: Reading Comprehension',
      correct: `${data?.partResult[6]}/54`,
    },
  ];

  return (
    <div id="detail-modal">
      {/* <ExclamationCircleOutlined /> */}
      <Modal
        title="Chi tiết"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        style={{ top: 30 }}
        width="50vmax"
      >
        <div className="result_wrapper">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div className="result_total_score">
              <span>
                <StarTwoTone /> Tổng điểm:{' '}
              </span>
              <span>{data?.listenPoint + data?.readPoint || ''}</span>
            </div>

            <div className="result_listening">
              <div className="result_header">
                <span className="topic">
                  Listening
                  {data?.listenNumber ? `(${data?.listenNumber}/100)` : ''}
                </span>
                <span className="topic sub-score">
                  Điểm: {data?.listenPoint ? `${data?.listenPoint}/495` : ''}
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
                  Reading{data?.readNumber ? `(${data?.readNumber}/100)` : ''}
                </span>
                <span className="topic sub-score">
                  Điểm: {data?.readPoint ? `${data?.readPoint}/495` : ''}
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
                onClick={() => {
                  history.push(`/exams/${data?.slug}/checkin`);
                }}
                icon={<EditOutlined />}
                size="large"
                style={{ padding: '0 3rem' }}
              >
                Làm lại
              </Button>
            </div>
          </Space>
        </div>
      </Modal>
    </div>
  );
}
UserExamModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  data: PropTypes.object,
};

UserExamModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  data: null,
};
export default UserExamModal;
