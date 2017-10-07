import React, { Component } from 'react';
import { connect } from 'react-redux';

import { voteComment, deleteComment } from './../actions/comments';

class Comment extends Component {

    formatDate(timestamp) {
        return new Date(timestamp).toUTCString();
    }

  render() {
    const { comment } = this.props;
    return (
      <div className="row comment" 
        key={comment.id} >
        <div className="col-1">
            <button 
                className="btn btn-outline-secondary btn-vote" 
                onClick={() => this.props.voteComment(comment, 1)}>
                    <span className="material-icons btn-vote">thumb_up</span>
            </button>
            <div className="comment-score">{comment.voteScore}</div>
            <button 
                className="btn btn-outline-secondary btn-vote"
                onClick={() => this.props.voteComment(comment, -1)}>
                    <span className="material-icons btn-vote">thumb_down</span>
            </button>
        </div>
        <div className="col">
            <div className="row d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="author">{comment.author}</div>
                    <div className="date">{this.formatDate(comment.timestamp)}</div>
                </div>
                <div>
                    <button className="btn btn-light ml-2"
                        onClick={() => this.props.open(comment)}>
                            <i className="material-icons">mode_edit</i>
                    </button>
                    <button className="btn btn-light ml-2"
                        onClick={() => this.props.deleteComment(comment.id)}>
                            <i className="material-icons">delete_forever</i>
                    </button>
                </div>
            </div>
            <div className="row">{comment.body}</div>
        </div>
    </div>   
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteComment: (comment, amount) => dispatch(voteComment(comment, amount)),
    deleteComment: (id) => dispatch(deleteComment(id))
  };
};

export default connect(null, mapDispatchToProps) (Comment);