import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated, useTransition } from 'react-spring';
import PageNav from '../page-nav';
import NotFound from '../not-found';
import Data from '../../storage/data.json';

const FIRST_RANK_NAME = 'Rank 1';

function Arcana(props) {
  const arcanaName = props.match.params.name;
  const slinks = Data.slinks;
  const arcanaList = Data.arcanaList;
  const arcana = slinks[arcanaName];

  function getPreviousArcana() {
    let index = arcanaList.indexOf(arcanaName);

    return arcanaList[index - 1] === undefined
      ? arcanaList[index]
      : arcanaList[index - 1];
  }

  function getNextArcana() {
    let index = arcanaList.indexOf(arcanaName);

    return arcanaList[index + 1] === undefined
      ? arcanaList[index]
      : arcanaList[index + 1];
  }

  if (arcana === undefined) {
    return <NotFound />;
  }

  return (
    <div className="h-full bg-gray-100">
      <div className="container px-4 py-4 mx-auto">
        <PageNav
          backName="Social Links"
          backRoute="/social"
          prev={`/social/${getPreviousArcana()}`}
          next={`/social/${getNextArcana()}`}
        />
        <div className="flex flex-row flex-wrap items-center my-8">
          <img
            src={`${process.env.PUBLIC_URL}/img/social-links/${arcanaName}.png`}
            className="w-20 h-20 pt-1 mr-6 bg-white rounded-md shadow-lg"
            alt={arcana.arcana}
          />
          <div className="flex flex-col mt-4">
            <p className="flex-grow text-5xl leading-10">{arcana.arcana}</p>
            <p className="text-2xl text-gray-500">{arcana.name}</p>
          </div>
        </div>

        <div className="flex flex-col">
          {arcana.rank.map((rank) => {
            return <Rank rank={rank} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Rank({ rank }) {
  const [expanded, toggle] = useState(false);

  const transition = useTransition(expanded, null, {
    from: { opacity: 0, maxHeight: '0px' },
    enter: { opacity: 1, maxHeight: '1000px' },
    leave: { opacity: 0, maxHeight: '0px' },
  });

  let rankName = rank.rank;
  let notes = rank.notes;
  let dialogs = rank.dialog;

  if (rank.rank === undefined) {
    rankName = FIRST_RANK_NAME;
    notes = rank;
  }

  function getDialogScoreColour(score) {
    switch (score) {
      case 0:
        return 'bg-red-400';
      case 1:
        return 'bg-yellow-400';
      case 2:
        return 'bg-orange-400';
      case 3:
        return 'bg-green-400';
      default:
        return 'bg-green-400';
    }
  }

  return (
    <div
      className="p-2 px-4 mb-2 bg-white border border-gray-400 rounded-sm shadow-md cursor-pointer"
      onClick={() => toggle(!expanded)}
    >
      <div className="flex flex-row mb-4 ">
        <p className="flex-grow text-lg">{rankName}</p>
        <FontAwesomeIcon
          icon={`${expanded ? 'caret-up' : 'caret-down'}`}
          size="1x"
        />
      </div>
      {transition.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div style={props}>
              <p className="text-sm italic">{notes}</p>
              {dialogs !== undefined &&
                dialogs.map((dialog) => {
                  return (
                    <div>
                      <p className="mb-4 text-sm italic font-bold">
                        {dialog.question}
                      </p>
                      {dialog.answers.map((answer) => {
                        return (
                          <div className="flex flex-row mb-2">
                            <p className="flex-grow ml-8 text-sm">
                              {answer[0]}
                            </p>
                            <div
                              className={`flex justify-center w-5 h-5 rounded-full items-center shadow-md text-center ${getDialogScoreColour(
                                answer[1]
                              )}`}
                            >
                              <span className="text-xs">{answer[1]}</span>
                            </div>
                          </div>
                        );
                      })}
                      <hr className="my-4"></hr>
                    </div>
                  );
                })}
            </animated.div>
          )
        );
      })}
    </div>
  );
}

export default Arcana;
