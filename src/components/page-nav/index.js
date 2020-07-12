import React, { useContext } from 'react';
import { __RouterContext } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function PageNav(props) {
  const context = useContext(__RouterContext);
  const { location } = context;

  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <Link
          className="flex items-center justify-center w-32 py-2 font-light bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none"
          to={{
            pathname: props.backRoute,
            state: { prevPath: location.pathname },
          }}
        >
          <FontAwesomeIcon
            className="mr-4 text-xs text-teal-400 outline-none"
            icon="chevron-left"
          />
          <span className="text-xs">{props.backName}</span>
        </Link>
      </div>
      <div class="inline-flex">
        <Link
          className="px-4 py-2 text-xs text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400 focus:outline-none"
          to={{
            pathname: props.prev,
            state: { prevPath: location.pathname },
          }}
          replace
        >
          Prev
        </Link>
        <Link
          className="px-4 py-2 text-xs text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400 focus:outline-none"
          to={{
            pathname: props.next,
            state: { prevPath: location.pathname },
          }}
        >
          Next
        </Link>
      </div>
    </div>
  );
}

export default PageNav;
