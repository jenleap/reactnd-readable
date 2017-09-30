import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from './../actions/posts';
import { getSelectedPosts } from './../selectors/posts';
import { sortByPopular, sortByRecent } from './../actions/filters';

class ListView extends Component {

  formatDate(timestamp) {
    return new Date(timestamp).toUTCString();
  }

  render() {
    console.log(this.props.posts);
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
            <Link to={`/posts/detail/${p.id}`}>
              <div className="list-group-item mb-1 post-item" 
                key={p.id}
                onClick={() => this.props.getPost(p.id)}>
                  <div className="row">
                    <div className="col">
                        <div>{p.title}</div>
                        <div className="head">
                          <div className="author">{p.author}</div>
                          <div className="date">{this.formatDate(p.timestamp)}</div>
                        </div>
                    </div>
                      <div className="col-2 vote-score">{p.voteScore} 
                        {p.voteScore >= 0 ? (
                          <span className="material-icons">thumb_up</span>
                        ) : (
                          <span className="material-icons">thumb_down</span>
                        )}
                      </div>
                  </div>
              </div>
            </Link>
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
    getPost: (id) => dispatch(getPost(id)),
    sortByPopular: () => dispatch(sortByPopular()),
    sortByRecent: () => dispatch(sortByRecent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);