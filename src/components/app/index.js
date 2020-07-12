import React, { useContext } from 'react';
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
  faCalendar,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { slideLeft, slideRight } from './slide-animation';
import Navbar from '../navbar';
import Home from '../home';
import Calendar from '../p4g-calendar';
import SocialLinks from '../social-links';
import Date from '../date';
import Arcana from '../arcana';
import './index.css';

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
  faCircle,
  faCalendar,
  faPlay
);

function App() {
  const context = useContext(__RouterContext);
  const prevState = context.history.location.state;
  let slide = slideRight;

  if (prevState !== undefined) {
    let prevPath = prevState.prevPath;

    if (
      context.location.pathname === '/' ||
      prevPath.includes('/social') ||
      (prevPath.includes('/calendar/') &&
        context.location.pathname === '/calendar')
    ) {
      slide = slideLeft;
    }
  }

  return (
    <div className="h-screen bg-gray-100 ">
      <Navbar />
      <main className="flex-grow">
        <AnimatedSwitch {...slide}>
          <Route exact path="/" component={Home} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/social" component={SocialLinks} />
          <Route path="/social/:name" component={Arcana} />
          <Route path="/calendar/:id" component={Date} />
        </AnimatedSwitch>
      </main>
    </div>
  );
}

export default App;
