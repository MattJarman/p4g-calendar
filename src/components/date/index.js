import React from 'react';
import './index.css';
import Data from '../../storage/data';
import PageNav from '../page-nav';
import DateInformation from '../date-information';
import NotFound from '../not-found';

// TODO: Don't render page if day is undefined
function Date(props) {
  const date = props.match.params.id;
  const calendar = Data.calendar;
  const dates = Data.dates;

  let day = calendar[date];

  localStorage.setItem('date-string', date);

  function getPreviousDate() {
    let date = props.match.params.id;
    let index = dates.indexOf(date);

    return dates[index - 1] === undefined ? dates[index] : dates[index - 1];
  }

  function getNextDate() {
    let date = props.match.params.id;
    let index = dates.indexOf(date);

    return dates[index + 1] === undefined ? dates[index] : dates[index + 1];
  }

  if (day === undefined) {
    return <NotFound />;
  }

  return (
    <div style={props} className="bg-gray-100">
      <div className="container h-screen px-4 py-8 mx-auto">
        <PageNav
          backName="Calendar"
          backRoute="/calendar"
          prev={`/calendar/${getPreviousDate()}`}
          next={`/calendar/${getNextDate()}`}
        />
        <div className="py-8">
          <div className="mb-8">
            <p className="text-4xl font-bold text-gray-800 ">
              {day.date}{' '}
              <span className="text-xl text-gray-500">{day.weekDay}</span>
            </p>
          </div>
          <div>
            <DateInformation
              title="After School"
              isNight={false}
              avail={day.dayAvail}
              socialLinks={day.socialLinks}
              spoilers={day.spoilers}
            />
            <DateInformation
              title="Night"
              isNight={true}
              avail={day.nightAvail}
              socialLinks={day.nightLinks}
              spoilers={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Date;
