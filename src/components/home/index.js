import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

function Home() {
  const date = localStorage.getItem('date-string');

  return (
    <div className="container px-6 pt-8 mx-auto my-4 bg-gray-100">
      {date !== null && (
        <Link
          className="flex flex-row items-center justify-center w-48 py-4 mb-8 text-white duration-300 ease-in-out transform rounded-md shadow-lg hover:-translate-y-1 hover:scale-105 lg:w-64 lg:py-6 bg-dark-pastel-green-500 hover:bg-dark-pastel-green-700"
          to={{ pathname: `/calendar/${date}` }}
        >
          <span className="text-xl font-bold uppercase lg:text-3xl">
            Continue
          </span>
          <FontAwesomeIcon
            icon="play"
            className="ml-4 text-2xl lg:text-3xl lg:ml-8"
          />
        </Link>
      )}
      <div className="flex flex-col flex-wrap md:-mx-4 md:flex-row">
        <Box
          link="/calendar"
          img={`${process.env.PUBLIC_URL}/img/p4banner.jpg`}
          title="Calendar"
          text="A replica of the in-game Persona 4 Golden calendar, with links to
            information about what can be completed on each day!"
        />
        <Box
          link="/social"
          img={`${process.env.PUBLIC_URL}/img/social.jpg`}
          title="Social Links"
          text="Full guides for all social links in the game, including general tips and the best repsonses for conversations."
        />
      </div>
    </div>
  );
}

function Box(props) {
  return (
    <div className="w-full mb-4 duration-300 ease-in-out transform md:px-4 md:py-4 md:w-1/2 hover:-translate-y-1 hover:scale-105">
      <Link to={{ pathname: props.link }} className="focus:outline-none">
        <div className="overflow-hidden bg-white rounded shadow-md">
          <img src={props.img} alt="" className="w-full" />
          <div className="px-6 py-4 mb-2">
            <div className="mb-2 text-2xl font-bold">{props.title}</div>
            <p className="text-sm">{props.text}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Home;
