import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { getComments, voteComment, deleteComment } from './../actions/comments';
import { selectedVote, deletePost, getPost } from './../actions/posts';

import Titlebar from './Titlebar';
import NewComment from './NewComment';
import Comment from './Comment';

class PostDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      selectedComment: null
    }
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  formatDate(timestamp) {
    return new Date(timestamp).toUTCString();
  }

  openModal = (comment) => {
      this.setState({selectedComment: comment});
      this.setState({modalOpen: true});
  }

  closeModal = () => {
      this.setState({modalOpen: false});
  }

  onDelete(id) {
      this.props.deletePost(id);
      this.props.history.push("/");
  }

  

  render() {
    return (
      <div className="container">
        <Titlebar />
        {this.props.post.deleted === false ? (
        <div>
        <div className="float-right">
          <Link className="btn btn-secondary"
            to={`/posts/edit/${this.props.post.id}`}>
            <i className="material-icons">mode_edit</i>
          </Link>
          <button className="btn btn-secondary ml-2"
            onClick={() => this.onDelete(this.props.post.id)}>
              <i className="material-icons">delete_forever</i>
          </button>
        </div>
        <div className="post-category">{this.props.post.category}</div>    
        <div className="post-title">{this.props.post.title}</div>
        <div className="post-date">{this.formatDate(this.props.post.timestamp)}</div>
        <div className="clearfix">
        <div className="post-author float-left">{this.props.post.author}</div>
        <div className="vote-div float-right">
          <div className="vote-score">{this.props.post.voteScore}</div>
          <button 
            className="btn btn-light ml-2" 
            onClick={() => this.props.updateVote(this.props.post, 1)}>
              <span className="material-icons">thumb_up</span>
          </button>
          <button 
            className="btn btn-light ml-2"
            onClick={() => this.props.updateVote(this.props.post, -1)}>
              <span className="material-icons">thumb_down</span>
          </button>
        </div>
        </div>
        <p>{this.props.post.body}</p>

        <div>
          <div className="comment-header">{this.props.comments.length} Comments</div>
 
          {this.props.comments.map( c => {
            return (
               <Comment 
                  key={c.id}
                  comment={c} 
                  open={this.openModal} /> 
            )
          })}
          <NewComment page="new" />
          
        </div>

        <Modal
          isOpen={this.state.modalOpen}
          contentLabel="Edit Comment">
          <NewComment 
            page="edit" 
            comment={this.state.selectedComment}
            close={this.closeModal} />
        </Modal>
      </div>
      ) : (
        <div>This post has been deleted.</div>      
      )}
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.selectedPost,
    comments: state.comments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (postId) => dispatch(getComments(postId)),
    updateVote: (post, amount) => dispatch(selectedVote(post, amount)),
    deletePost: (id) => dispatch(deletePost(id)),
    voteComment: (comment, amount) => dispatch(voteComment(comment, amount)),
    getPost: (id) => dispatch(getPost(id)),
    deleteComment: (id) => dispatch(deleteComment(id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PostDetail));