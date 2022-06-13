import { Col, Row } from 'antd';
import ScheduleBoard from 'features/Schedule/components/ScheduleBoard';
import { fetchSchedules } from 'features/Schedule/scheduleSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import './style.scss';

MainPage.propTypes = {};

function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = 'Thời khoá biểu';

    const curentWeek = commonFuc.getCurrentWeek();
    dispatch(
      fetchSchedules({
        dateFrom: curentWeek.monday,
        dateTo: curentWeek.sunday,
        page: 0,
        size: 99,
      })
    );
  }, []);

  const { user } = useSelector((state) => state.global);

  return (
    <div id="schedule-main-page">
      <div className="schedule-container">
        <Row style={{ width: '100%' }}>
          <Col span={24}>
            <ScheduleBoard />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MainPage;
