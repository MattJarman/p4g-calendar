import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import Card from '../card';

function DateInformation(props) {
  return (
    <div className="flex flex-col mb-8 bg-white rounded-md shadow-lg">
      <div className="flex flex-row items-center p-2 border-b-2 border-gray-200 rounded-t-md">
        <DateIcon isNight={props.isNight} />
        <div className="flex-row flex-grow text-center">
          <p className="text-xl font-bold text-center">{props.avail}</p>
        </div>
        <DateIcon isNight={props.isNight} />
      </div>

      <div>
        <Notes notes={props.notes} />
        <SocialLink links={props.socialLinks} isNight={props.isNight} />
        <Spoilers spoilers={props.spoilers} />
      </div>
    </div>
  );
}

function Notes({ notes }) {
  if (notes === '') {
    return null;
  }

  return (
    <div className="p-4 m-2">
      <Title icon={['far', 'sticky-note']} title="Notes" />
      <p className="ml-10 text-xs italic text-gray-800 md:text-sm">
        {parse(notes)}
      </p>
    </div>
  );
}

function SocialLink({ links, isNight }) {
  const context = useContext(__RouterContext);
  const { location } = context;

  if (links === undefined || links === null || links.length === 0) {
    return null;
  }

  return (
    <div className="p-4 m-2">
      <Title icon="user-friends" title="Social Links" />
      <div className="flex flex-wrap justify-center mt-4 md:justify-start">
        {links.map((link) => {
          return (
            <Link
              key={link}
              className={`w-24 h-24 m-2 overflow-hidden duration-300 ease-in-out transform rounded-full shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110 ${
                isNight ? 'bg-blue-500' : 'bg-orange-500'
              }`}
              to={{
                pathname: `/social/${link}`,
                state: { prevPath: location.pathname },
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
      <Title icon="book" title="Spoilers / Trivia" />
      <div className="flex flex-wrap mx-4 my-8">
        {spoilers.map((spoiler, index) => {
          return (
            <Card key={index} front={spoiler.question} back={spoiler.answer} />
          );
        })}
      </div>
    </div>
  );
}

function Title({ icon, title }) {
  return (
    <div className="flex items-center mb-2 text-xl font-bold whitespace-no-wrap">
      <span className="flex items-center justify-center w-10">
        <FontAwesomeIcon icon={icon} className="text-black" />
      </span>
      <span>{title}</span>
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
