/* eslint-disable react/prop-types */
import moment from 'moment';
import 'moment/locale/vi';
import React, { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { myEventsList } from 'utils/constants';
import ScheduleHeader from '../ScheduleHeader';
import Toolbar from '../Toolbar';
import './style.scss';

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

const ScheduleBoard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);
  const { schedules } = useSelector((state) => state.schedule);

  const localizer = momentLocalizer(moment);

  const calendarProps = useMemo(() => {
    const today = new Date();
    return {
      components: {
        // timeSlotWrapper: ColoredDateCellWrapper,
        // toolbar: CustomToolbar,
        toolbar: Toolbar,
        calendarType: 'week',
        header: ScheduleHeader,
        event: (props) => {
          // console.log(props.event?.desc);

          return (
            <div>
              <div>{props.start}</div>
              <div>{props.title}</div>
              <div>{props.event?.description}</div>
            </div>
          );
        },
      },
      defaultDate: new Date(),
      // views: Object.keys(Views).map((k) => Views[k]),
      views: ['week'],
      min: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        8,
        30
      ),
      max: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22),
    };
  }, []);

  return (
    <div>
      <Calendar
        components={calendarProps.components}
        defaultDate={calendarProps.defaultDate}
        events={schedules}
        localizer={localizer}
        showMultiDayTimes
        step={60}
        timeslots={1}
        views={calendarProps.views}
        defaultView="week"
        min={calendarProps.min}
        max={calendarProps.max}
      />
    </div>
  );
};

ScheduleBoard.propTypes = {};

export default ScheduleBoard;
