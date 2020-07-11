import React, { Component } from 'react';
import Card from '../card';

const Front = (props) => <div className="front" />;
const Back = (props) => <div className="back" />;

class Home extends Component {
  render() {
    return (
      <>
        <div className="h-screen">
          <p>Hello, World</p>
        </div>
      </>
    );
  }
}

export default Home;
