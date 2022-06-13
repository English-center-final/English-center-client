/* eslint-disable react/prop-types */
import 'moment/locale/vi';
import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const ScheduleHeader = ({ date, localizer }) => {
  return (
    <div className="header-container">
      <div className="header__date">
        {localizer.format(date, 'dddd').toUpperCase()}
      </div>
      <div className="header__date">{localizer.format(date, 'DD/MM/yyyy')}</div>
    </div>
  );
};

ScheduleHeader.propTypes = {
  date: PropTypes.object,
  localizer: PropTypes.object,
};

ScheduleHeader.defaultProps = {
  date: null,
  localizer: null,
};

export default ScheduleHeader;
