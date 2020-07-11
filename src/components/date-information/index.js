import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../card';

class DateInformation extends Component {
  render() {
    return (
      <div className="flex flex-col mb-8 bg-white rounded-md shadow-lg">
        <div className="flex flex-row items-center p-2 border-b-2 border-gray-300 rounded-t-md">
          <DateIcon isNight={this.props.isNight} />
          <div className="flex-row flex-grow text-center">
            <p className="text-xl font-bold text-center">{this.props.avail}</p>
          </div>
          <DateIcon isNight={this.props.isNight} />
        </div>

        <div className="">
          <SocialLink
            links={this.props.socialLinks}
            isNight={this.props.isNight}
          />
          <Spoilers spoilers={this.props.spoilers} />
        </div>
      </div>
    );
  }
}

function SocialLink({ links, isNight }) {
  if (links === undefined || links === null || links.length === 0) {
    return null;
  }

  return (
    <div className="p-4 m-2">
      <p className="flex items-center text-xl font-bold whitespace-no-wrap">
        <span>
          <FontAwesomeIcon icon="user-friends" className="mr-2 text-black" />
        </span>
        Social Links
      </p>
      <div className="flex flex-wrap justify-center mt-4 md:justify-start">
        {links.map((link) => {
          return (
            <Link
              className={`w-24 h-24 m-2 overflow-hidden duration-300 ease-in-out transform rounded-full shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110 ${
                isNight ? 'bg-blue-500' : 'bg-orange-500'
              }`}
              to={{
                pathname: `/social/${link}`,
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/img/social-links/${link}.png`}
                alt={`${link}`}
                className="max-w-full max-h-full min-w-full min-h-full"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Spoilers({ spoilers }) {
  if (spoilers === undefined || spoilers === null || spoilers.length === 0) {
    return null;
  }

  return (
    <div className="p-4 m-2">
      <p className="flex items-center text-xl font-bold whitespace-no-wrap">
        <span>
          <FontAwesomeIcon icon="book" className="mr-2 text-black" />
        </span>
        Spoilers / Trivia
      </p>
      <div className="flex mx-4 my-8">
        {spoilers.map((spoiler) => {
          return <Card front={spoiler.question} back={spoiler.answer} />;
        })}
      </div>
    </div>
  );
}

function DateIcon({ isNight }) {
  return (
    <FontAwesomeIcon
      icon={`${isNight ? 'moon' : 'sun'}`}
      size="2x"
      className={`${isNight ? 'text-blue-800' : 'text-orange-500'}`}
    />
  );
}

export default DateInformation;
