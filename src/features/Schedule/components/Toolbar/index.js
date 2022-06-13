import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import { fetchSchedules } from 'features/Schedule/scheduleSlice';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import commonFuc from 'utils/commonFuc';

function Toolbar(props) {
  const dispatch = useDispatch();

  // const currentDate = moment(new Date());
  // const [selectDate, setSelectDate] = useState(currentDate);

  const { date, label, onNavigate } = props;

  console.log({ onNavigate });
  const goToBack = () => {
    date.setDate(date.getDate() - 7);

    handleSchedule(date);

    onNavigate('prev');
  };

  const goToNext = () => {
    date.setDate(date.getDate() + 7);

    handleSchedule(date);

    onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    date.setDate(now.getDate());
    date.setMonth(now.getMonth());
    date.setYear(now.getFullYear());

    handleSchedule(date);

    onNavigate('current');
  };

  const handleSchedule = (date) => {
    const dateFm = commonFuc.formatDate(date.toString());
    const monnday = commonFuc.getMonday(dateFm);
    const sunday = commonFuc.getSunday(dateFm);

    console.log('mon: ', monnday);
    console.log('sun: ', sunday);

    dispatch(
      fetchSchedules({
        dateFrom: monnday,
        dateTo: sunday,
        page: 0,
        size: 99,
      })
    );
  };

  // const handleSelectDate = (dates, dateStrings) => {
  //   console.log({ dates, dateStrings });
  //   const temp = dates || currentDate;

  //   const date = new Date(temp.format('YYYY-MM-DD'));

  //   console.log(date);
  //   handleSchedule(date);
  //   setSelectDate(temp);
  //   onNavigate('14/05/2022');
  // };

  return (
    <Row justify="space-between">
      <Col>
        <h2 style={{ color: '#68757e' }}> Lịch học theo tuần</h2>
      </Col>
      <Col>
        <Space>
          {/* <DatePicker
            format="DD/MM/YYYY"
            placeholder="dd/mm/yyyy"
            value={moment(selectDate, 'MM/DD/YYYY')}
            onChange={handleSelectDate}
          /> */}
          <Button onClick={goToBack}>
            <LeftOutlined />
            Trở về
          </Button>

          <Button onClick={goToCurrent} icon={<CalendarOutlined />}>
            Hiện tại
          </Button>

          {/* <Button onClick={goToBack}>&#8249; Trở về</Button> */}
          {/* <Button onClick={goToNext}>Tiếp &#8250;</Button> */}
          <Button onClick={goToNext}>
            Tiếp
            <RightOutlined />
          </Button>
        </Space>
      </Col>
    </Row>
  );
}

Toolbar.propTypes = {
  date: PropTypes.object,
  label: PropTypes.string,
  onNavigate: PropTypes.func,
};
Toolbar.defaultProps = {
  date: null,
  label: '',
  onNavigate: null,
};

export default Toolbar;
