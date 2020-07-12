import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';

function Navbar() {
  const context = useContext(__RouterContext);
  const { location } = context;

  const [hidden, setHidden] = useState(true);

  function toggleHidden() {
    setHidden(!hidden);
  }

  function hide() {
    setHidden(true);
  }

  return (
    <>
      <nav className="sticky z-30 flex flex-wrap items-center justify-between p-2 bg-teal-400 shadow-lg top-10">
        <div className="flex items-center flex-shrink-0 mr-6 text-white">
          <img
            src={`${process.env.PUBLIC_URL}/icon/TV-solid.svg`}
            alt="TV"
            className="w-8 h-8 fill-current"
          />
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 text-white rounded outline-none hover:text-white focus:outline-none"
            onClick={toggleHidden}
          >
            <FontAwesomeIcon className="outline-none" icon="bars" />
          </button>
        </div>
        <div className="w-full lg:flex lg:items-center lg:w-auto">
          <div className="lg:flex-grow"></div>
          <div className={`lg:flex ${hidden ? 'hidden' : ''}`}>
            <NavItem
              onClick={hide}
              path="/"
              prevPath={location.pathname}
              name="Home"
              exact={true}
            />
            <NavItem
              onClick={hide}
              path="/calendar"
              prevPath={location.pathname}
              name="Calendar"
            />
            <NavItem
              onClick={hide}
              path="/social"
              prevPath={location.pathname}
              name="Social Links"
            />
          </div>
        </div>
      </nav>
    </>
  );
}

function NavItem(props) {
  return (
    <NavLink
      activeClassName="lg:border-b-2 active"
      className="block mt-4 mr-6 font-semibold text-white outline-none sm:inline-block sm:mt-0 hover:text-white"
      onClick={props.onClick}
      exact={props.exact ?? false}
      to={{
        pathname: props.path,
        state: { prevPath: props.prevPath },
      }}
    >
      {props.name}
    </NavLink>
  );
}

export default Navbar;
