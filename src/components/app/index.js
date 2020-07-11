import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import { AnimatedSwitch } from 'react-router-transition';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faChevronLeft,
  faChevronRight,
  faUserFriends,
  faBook,
  faCaretDown,
  faCaretUp,
  faSun,
  faMoon,
  faTimes,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { slideLeft, slideRight } from './slide-animation';
import './index.css';
import Navbar from '../navbar';
import Home from '../home';
import Calendar from '../p4g-calendar';
import SocialLinks from '../social-links';
import Day from '../day';
import Arcana from '../arcana';

library.add(
  faBars,
  faChevronLeft,
  faChevronRight,
  faUserFriends,
  faBook,
  faCaretDown,
  faCaretUp,
  faSun,
  faMoon,
  faTimes,
  faCircle
);

function App() {
  const context = useContext(__RouterContext);
  const prevState = context.history.location.state;
  let slide = slideRight;

  if (prevState !== undefined) {
    let prevPath = prevState.prevPath;
    if (prevPath === '/social' || prevPath === '/calendar/*') {
      slide = slideLeft;
    }
  }

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <AnimatedSwitch {...slide}>
            <Route exact path="/" component={Home} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/social" component={SocialLinks} />
            <Route exact path="/social/:name" component={Arcana} />
            <Route exact path="/calendar/:id" component={Day} />
          </AnimatedSwitch>
        </main>
      </div>
    </>
  );
}

export default App;
