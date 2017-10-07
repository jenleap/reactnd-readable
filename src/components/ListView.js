import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSelectedPosts } from './../selectors/posts';
import { sortByPopular, sortByRecent } from './../actions/filters';
import { getAllComments } from './../actions/comments';

import PostItem from './PostItem';

class ListView extends Component {

  componentDidMount() {
    this.props.getAllComments();
  }

  render() {
    return (
      <div className="post-list">
        <div className="mb-3">
          <Link className="btn btn-secondary"
            to="/posts/new">
            Create New Post
          </Link>
          <div className="float-right">
            <button 
                className="btn btn-light mr-2"
                onClick={this.props.sortByPopular}>
                Most Popular
            </button>
            <button 
                className="btn btn-light"
                onClick={this.props.sortByRecent}>
                Most Recent
            </button>
          </div>
        </div>
        {this.props.posts.map( p => {
          return (
            <PostItem 
              key={p.id}
              post={p} />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: getSelectedPosts(state.posts, state.filters)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllComments: () => dispatch(getAllComments()),
    sortByPopular: () => dispatch(sortByPopular()),
    sortByRecent: () => dispatch(sortByRecent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);