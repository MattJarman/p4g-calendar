import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../../storage/data.json';

// TODO: Ensure transition when at bottom of page is smooth, as currently the page will snap to the top
class SocialLinks extends Component {
  constructor() {
    super();
    this.arcanaList = Data.arcanaList;
    this.slinks = Data.slinks;
  }

  capitalise(string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }

  render() {
    return (
      <div className="h-full bg-gray-100">
        <div className="container mx-auto">
          <p className="mb-4 ml-4 text-4xl">Social Links</p>
          <div className="flex flex-row flex-wrap justify-center ">
            {this.arcanaList.map((arcana) => {
              return (
                <Link
                  className="w-full p-2 mx-4 my-2 duration-300 ease-in-out transform bg-white rounded-md shadow-lg hover:-translate-y-1 hover:scale-105 md:w-3/12"
                  to={{
                    pathname: `/social/${arcana}`,
                  }}
                >
                  <div className="flex flex-row">
                    <div>
                      <img
                        src={`${process.env.PUBLIC_URL}/img/social-links/${arcana}.png`}
                        alt={this.slinks[arcana].name}
                        className="w-16 h-16 mr-4 bg-gray-300 rounded-md shadow-lg"
                      />
                    </div>
                    <div>
                      <p className="text-xl">
                        {this.capitalise(arcana)} Arcana
                      </p>
                      <p className="text-sm text-gray-600">
                        {this.slinks[arcana].name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SocialLinks;
