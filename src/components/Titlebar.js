import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Titlebar extends Component {
  render() {
    return (
      <div className="titlebar">
          <Link to="/" className="text-white">Readable</Link>
      </div>
    );
  }
}

export default Titlebar;