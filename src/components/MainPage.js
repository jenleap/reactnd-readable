import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from './../actions/posts';

import Titlebar from './Titlebar';
import NavBar from './NavBar';
import ListView from './ListView';

class MainPage extends Component {

  componentWillMount() {
      this.props.getPosts();
  }

  render() {
    return (
      <div className="container">
        <Titlebar />
        <div className="row">
          <div className="col">
              <NavBar />
          </div>
          <div className="col-9">
              <ListView />
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts())
  };
};

export default connect(null, mapDispatchToProps) (MainPage);