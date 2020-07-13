import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Data from '../../storage/data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: Use JSON data to show what dates have events

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    let date = props.date;

    if (localStorage.getItem('date') !== null) {
      date = new Date(localStorage.getItem('date'));
    }

    this.state = {
      date: date,
    };
    this.originalDate = new Date(props.date.getTime());
    this.endDate = new Date(this.originalDate.getTime()).setMonth(
      this.originalDate.getMonth() + props.period - 1
    );
    this.dates = Data.dates;
    this.calendar = Data.calendar;
    this.getDays = this.getDays.bind(this);
    this.getBlankDays = this.getBlankDays.bind(this);
    this.incrementMonth = this.incrementMonth.bind(this);
    this.canIncrement = this.canIncrement.bind(this);
    this.decrementMonth = this.decrementMonth.bind(this);
    this.canDecrement = this.canDecrement.bind(this);
    this.hasSocialLinks = this.hasSocialLinks.bind(this);
  }

  getDays() {
    let year = this.state.date.getFullYear();
    let month = this.state.date.getMonth();

    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  }

  getBlankDays() {
    let year = this.state.date.getFullYear();
    let month = this.state.date.getMonth();

    let dayOfWeek = new Date(year, month).getDay();

    let blankDaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankDaysArray.push(i);
    }

    return blankDaysArray;
  }

  canIncrement() {
    return this.state.date < this.endDate;
  }

  canDecrement() {
    return this.state.date > this.originalDate;
  }

  incrementMonth() {
    if (this.state.date >= this.endDate) {
      return;
    }

    this.setState((state) => {
      let date = state.date;
      let month = date.getMonth() + 1;

      date.setMonth(month);
      localStorage.setItem('date', date);
      return { date: date };
    });
  }

  decrementMonth() {
    if (this.state.date <= this.originalDate) {
      return;
    }

    this.setState((state) => {
      let date = state.date;
      let month = date.getMonth() - 1;

      date.setMonth(month);
      localStorage.setItem('date', date);
      return { date: date };
    });
  }

  hasSocialLinks(day) {
    let info = this.calendar[day];

    if (info === undefined) {
      return false;
    }

    return info.socialLinks.length > 0 || info.nightLinks.length > 0;
  }

  getDateString(day) {
    return (
      ('0' + (this.state.date.getMonth() + 1)).slice(-2) + ('0' + day).slice(-2)
    );
  }

  render() {
    return (
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <span className="text-2xl font-bold text-gray-800 md:text-lg">
              {MONTH_NAMES[this.state.date.getMonth()]}
            </span>
            <span className="ml-1 text-lg font-normal text-gray-600 md:text-lg">
              {this.state.date.getFullYear()}
            </span>
          </div>
          <div>
            <button
              type="button"
              className={`inline-flex items-center p-1 mr-2 leading-none transition duration-100 ease-in-out rounded-md cursor-pointer focus:outline-none ${
                this.canDecrement()
                  ? 'bg-indigo-400 hover:bg-indigo-600'
                  : 'bg-gray-300'
              }`}
              onClick={this.decrementMonth}
            >
              <FontAwesomeIcon
                icon="chevron-left"
                className="mx-2 my-1 text-white"
              />
            </button>
            <button
              type="button"
              className={`inline-flex items-center p-1 leading-none transition duration-100 ease-in-out rounded-md cursor-pointer focus:outline-none ${
                this.canIncrement()
                  ? 'bg-indigo-400 hover:bg-indigo-600'
                  : 'bg-gray-300'
              }`}
              onClick={this.incrementMonth}
            >
              <FontAwesomeIcon
                icon="chevron-right"
                className="mx-2 my-1 text-white"
              />
            </button>
          </div>
        </div>

        <div className="-mx-1 -mb-1">
          <div className="flex flex-wrap md:-mb-10">
            {/* For each day of the week */}
            {DAY_NAMES.map((name) => {
              return (
                <div
                  key={name}
                  style={{ width: '14.26%' }}
                  className="px-2 py-2"
                >
                  <div className="text-xs font-bold tracking-wide text-center text-gray-600 uppercase md:text-sm">
                    {name}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap border-t border-l">
            {this.getBlankDays().map((day) => {
              return (
                <div
                  key={day}
                  style={{ width: '14.28%' }}
                  className="relative h-16 px-4 pt-2 border-b border-r md:h-32"
                ></div>
              );
            })}

            {this.getDays().map((day) => {
              let dateString = this.getDateString(day);

              if (!this.dates.includes(dateString)) {
                return (
                  <CalendarDay
                    key={day}
                    day={day}
                    dateString={dateString}
                    disabled={true}
                  />
                );
              }
              return (
                <CalendarDay
                  key={day}
                  day={day}
                  dateString={dateString}
                  hasSocialLinks={this.hasSocialLinks(dateString)}
                  disable={false}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

function CalendarDay({ day, dateString, hasSocialLinks, disabled }) {
  if (disabled) {
    return (
      <div
        style={{ width: '14.28%' }}
        className="relative h-16 px-1 text-xs bg-gray-100 border-b border-r md:pt-2 md:px-4 md:h-32 md:text-base"
        to={{
          pathname: `/calendar/${dateString}`,
        }}
      >
        <div className="flex flex-row items-center">
          <span className="flex-grow">{day}</span>
          <FontAwesomeIcon icon="times" className="text-red-600" />
        </div>
      </div>
    );
  }

  return (
    <NavLink
      style={{ width: '14.28%' }}
      className="relative h-16 px-1 text-xs border-b border-r md:pt-2 md:px-4 md:h-32 hover:bg-gray-100 focus:outline-none md:text-base"
      to={{
        pathname: `/calendar/${dateString}`,
      }}
    >
      <div className="flex flex-row items-center">
        <span className="flex-grow">{day}</span>
        {hasSocialLinks && (
          <FontAwesomeIcon
            icon="circle"
            className="text-blue-400 text-xxs md:text-xs"
          />
        )}
      </div>
    </NavLink>
  );
}

export default Calendar;
