import React, { Component } from 'react';
import TeamGenerator from './TeamGenerator';

class Landing extends Component {
  componentDidMount() {
    TeamGenerator();
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
};

export default Landing;
