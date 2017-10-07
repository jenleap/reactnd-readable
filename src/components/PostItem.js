import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getComments, voteComment, deleteComment } from './../actions/comments';
import { updateVote, deletePost, getPost } from './../actions/posts';

class PostItem extends Component {

  formatDate(timestamp) {
    return new Date(timestamp).toUTCString();
  }

  countComments() {
    const comments = this.props.comments.filter( c => (
        c.parentId === this.props.post.id));
    return comments.length;
  }

  render() {
    const {post} = this.props;
    return (    
              <div className="list-group-item mb-1 post-item" 
                key={post.id}
                onClick={() => this.props.getPost(post.id)}>
                <div className="row">
                    <div className="col">
                        <Link to={`/posts/detail/${post.id}`}>
                            <div>{post.title}</div>
                        </Link>
                        <div className="head">
                          <div className="author">{post.author}</div>
                          <div className="date">{this.formatDate(post.timestamp)}</div>
                        </div>
                    </div>

                    <div className="float-right">
                        <Link className="btn btn-secondary btn-vote"
                            to={`/posts/edit/${post.id}`}>
                            <i className="material-icons">mode_edit</i>
                        </Link>
                        <button className="btn btn-secondary btn-vote ml-2"
                            onClick={() => this.props.deletePost(post.id)}>
                            <i className="material-icons">delete_forever</i>
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">{this.countComments()} Comments</div>

                    <div className="vote-div ml-5">
                        <button 
                            className="btn btn-light btn-vote ml-2" 
                            onClick={() => this.props.updateVote(post, 1)}>
                            <span className="material-icons">thumb_up</span>
                        </button>
                        <div>{post.voteScore}</div>
                        <button 
                            className="btn btn-light btn-vote ml-2"
                            onClick={() => this.props.updateVote(post, -1)}>
                            <span className="material-icons">thumb_down</span>
                        </button>
                    </div>
                </div>           
                </div>
        
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (postId) => dispatch(getComments(postId)),
    updateVote: (post, amount) => dispatch(updateVote(post, amount)),
    deletePost: (id) => dispatch(deletePost(id)),
    voteComment: (comment, amount) => dispatch(voteComment(comment, amount)),
    getPost: (id) => dispatch(getPost(id)),
    deleteComment: (id) => dispatch(deleteComment(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);