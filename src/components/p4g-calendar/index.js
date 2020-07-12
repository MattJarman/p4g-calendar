import React, { Component } from 'react';
import Calendar from '../calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const YEAR = 2011;
const MONTH = 4;
const MONTH_PERIOD = 11;

class P4GCalendar extends Component {
  render() {
    return (
      <>
        <div className="container flex flex-col h-full px-4 mx-auto">
          <div className="flex flex-row items-center mt-4 mb-8 ml-4">
            <FontAwesomeIcon icon="calendar" size="2x" className="mr-4" />
            <p className="text-4xl font-bold">Calendar</p>
          </div>
          <div className="flex flex-row w-full mb-2">
            <div className="flex-grow"></div>
            <div className="flex flex-row flex-wrap items-center">
              <div className="flex flex-row items-center mr-2">
                <FontAwesomeIcon
                  icon="circle"
                  className="mr-2 text-xs text-blue-400"
                />
                <span className="text-sm whitespace-no-wrap">Social Links</span>
              </div>
              <div className="flex flex-row items-center mr-2">
                <FontAwesomeIcon icon="times" className="mr-2 text-red-600" />
                <span className="text-sm whitespace-no-wrap">Invalid Date</span>
              </div>
            </div>
          </div>
          <Calendar date={new Date(YEAR, MONTH, 0)} period={MONTH_PERIOD} />
        </div>
      </>
    );
  }
}

export default P4GCalendar;
