import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import './index.css';
import Data from '../../storage/data';
import DateInformation from '../date-information';
import NotFound from '../not-found';

// TODO: Don't render page if day is undefined
class Day extends Component {
  constructor(props) {
    super(props);
    this.date = this.props.match.params.id;
    this.calendar = Data.calendar;
    this.state = {
      date: this.props.match.params.id,
      day: Data.calendar[this.date],
    };
    this.dates = Data.dates;
    this.getPreviousDate = this.getPreviousDate.bind(this);
    this.getNextDate = this.getNextDate.bind(this);
  }

  componentDidUpdate(prevProps) {
    let id = this.props.match.params.id;
    if (id !== prevProps.match.params.id) {
      this.setState({
        date: id,
        day: Data.calendar[id],
      });
    }
  }

  getPreviousDate() {
    let date = this.props.match.params.id;
    let index = this.dates.indexOf(date);

    return this.dates[index - 1] === undefined
      ? this.dates[index]
      : this.dates[index - 1];
  }

  getNextDate() {
    let date = this.props.match.params.id;
    let index = this.dates.indexOf(date);

    return this.dates[index + 1] === undefined
      ? this.dates[index]
      : this.dates[index + 1];
  }

  render() {
    if (this.state.day === undefined) {
      return <NotFound />;
    }

    return (
      <div className="bg-gray-100">
        <div className="container h-screen px-4 py-8 mx-auto">
          <div className="flex flex-row">
            <div className="flex-grow">
              <NavLink
                className="flex items-center justify-center w-24 py-2 font-light bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none"
                to={{
                  pathname: '/calendar/',
                }}
              >
                <FontAwesomeIcon
                  className="mr-4 text-xs text-blue-500 outline-none"
                  icon="chevron-left"
                />
                <span className="text-xs">Calendar</span>
              </NavLink>
            </div>
            <div class="inline-flex">
              <NavLink
                className="px-4 py-2 text-xs text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400 focus:outline-none"
                to={{
                  pathname: `/calendar/${this.getPreviousDate()}`,
                }}
                replace
              >
                Prev
              </NavLink>
              <NavLink
                className="px-4 py-2 text-xs text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400 focus:outline-none"
                to={{
                  pathname: `/calendar/${this.getNextDate()}`,
                }}
              >
                Next
              </NavLink>
            </div>
          </div>
          <div className="py-8">
            <div className="mb-8">
              <p className="text-4xl text-gray-800">
                {this.state.day.date}{' '}
                <span className="text-xl text-gray-500">
                  {this.state.day.weekDay}
                </span>
              </p>
            </div>
            <div>
              <DateInformation
                title="After School"
                isNight={false}
                avail={this.state.day.dayAvail}
                socialLinks={this.state.day.socialLinks}
                spoilers={this.state.day.spoilers}
              />
              <DateInformation
                title="Night"
                isNight={true}
                avail={this.state.day.nightAvail}
                socialLinks={this.state.day.nightLinks}
                spoilers={null}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Day;
