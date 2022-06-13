import settings from 'app/settings';
import constants from './constants';

const commonFuc = {
  addSTTForList: (arr, start) => {
    if (!arr) {
      return [];
    }
    return arr.map((ele, index) => ({ stt: index + 1 + start, ...ele }));
  },

  toVietnamDay: (dayString) => {
    const days = [];
    if (typeof dayString === 'string') {
      const daySplit = dayString.split(', ');

      if (daySplit.length > 0) {
        for (const element of daySplit) {
          // eslint-disable-next-line no-unused-vars
          for (const [_, day] of Object.entries(settings.constants.DayOfWeek)) {
            if (day.key === element) {
              days.push(day.value);
            }
          }
        }
      }
    }

    return days;
  },

  getNext7day: () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return commonFuc.formatDate(date.toString());
  },

  getMonday: (dateString) => {
    const d = new Date(
      dateString.replace(
        constants.StandardDate.PATTERN,
        constants.StandardDate.FORMAT
      )
    );
    let day = d.getDay();

    let diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const date = new Date(d.setDate(diff));

    return commonFuc.formatDate(date.toString());
  },

  getSunday: (dateString) => {
    const d = new Date(
      dateString.replace(
        constants.StandardDate.PATTERN,
        constants.StandardDate.FORMAT
      )
    );
    const today = d.getDate();
    const dayOfTheWeek = d.getDay();
    const newDate = d.setDate(today - dayOfTheWeek + 7);

    const date = new Date(newDate);

    return commonFuc.formatDate(date.toString());
  },

  getCurrentWeek: () => {
    const now = new Date();

    const nowStr = commonFuc.formatDate(now.toString());

    return {
      monday: commonFuc.getMonday(nowStr),
      sunday: commonFuc.getSunday(nowStr),
    };
  },

  formatDate: (dateString) => {
    if (dateString === '') {
      return '';
    }
    const day = new Date(dateString);
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
  },

  getStatusObj: (statusValue, statusObj) => {
    // eslint-disable-next-line no-unused-vars
    for (const [_, element] of Object.entries(statusObj)) {
      if (element.key === statusValue) {
        return element;
      }
    }
  },

  isRegistered: (classId, registeredClass) => {
    for (const element of registeredClass) {
      if (
        element.classesId === classId &&
        element.status !== constants.UserClassStatus.CANCEL.key
      ) {
        return false;
      }
    }

    return true;
  },

  handleData: (data) => {
    const { id, date, description, room, session } = data;
    const d = new Date(
      date.replace(
        constants.StandardDate.PATTERN,
        constants.StandardDate.FORMAT
      )
    );

    let duration;

    switch (session) {
      case constants.SESSION[1].key:
        duration = {
          start: {
            hour: 8,
            minute: 30,
          },
          end: {
            hour: 11,
            minute: 30,
          },
        };
        break;
      case constants.SESSION[2].key:
        duration = {
          start: {
            hour: 14,
            minute: 0,
          },
          end: {
            hour: 17,
            minute: 0,
          },
        };
        break;
      case constants.SESSION[3].key:
        duration = {
          start: {
            hour: 17,
            minute: 45,
          },
          end: {
            hour: 19,
            minute: 15,
          },
        };
        break;
      case constants.SESSION[4].key:
        duration = {
          start: {
            hour: 19,
            minute: 45,
          },
          end: {
            hour: 21,
            minute: 15,
          },
        };
        break;

      default:
        duration = {
          start: {
            hour: 8,
            minute: 30,
          },
          end: {
            hour: 11,
            minute: 30,
          },
        };
        break;
    }

    const title = `Phòng: ${room}`;
    const start = new Date(d);
    start.setHours(duration.start.hour);
    start.setMinutes(duration.start.minute);

    const end = new Date(d);
    end.setHours(duration.end.hour);
    end.setMinutes(duration.end.minute);

    console.log({ id, duration });

    return { id, title, start, end, description };
  },

  groupBranch: (branches) => {
    // return branches.reduce(function (rv, x) {
    //   (rv[x['length']] = rv[x['length']] || []).push(x);
    //   return rv;
    // }, {});

    const grouped = branches.reduce((previousValue, currentValue) => {
      (previousValue[currentValue.name] =
        previousValue[currentValue.name] || []).push(currentValue);
      return previousValue;
    }, {});

    const data = [];

    for (const [key, value] of Object.entries(grouped)) {
      const group = key;
      const options = value.map((ele) => {
        return { key: ele.id, value: ele.address };
      });

      data.push({ group, options });
    }

    console.log({ data });

    return data;
  },
};

export default commonFuc;
