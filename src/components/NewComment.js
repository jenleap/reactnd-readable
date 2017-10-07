import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { createComment, updateComment } from './../actions/comments';

class NewComment extends Component {

    componentWillMount() {
        if (this.props.page === "edit") {
            this.initializeForm(); 
        }
    }

    initializeForm() {
        const initData = {
            "author": this.props.comment.author,
            "body": this.props.comment.body
        };
        this.props.initialize(initData);
    }

    renderTextArea(field) {
        const className = `comment-field ${field.meta.touched && field.meta.error ? "border border-danger" : ""}`;

        return (
            <div className="">
                <label>{field.label}</label>
                <div>
                    <textarea 
                        rows="4" cols="50"
                        {...field.input} 
                        className={className}
                        type={field.type} 
                        placeholder={field.placeholder}/>
                
                <div className="text-danger">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
                </div>
            </div>
            )
    }
    


    renderField(field) {
        const className = `comment-field ${field.meta.touched && field.meta.error ? "border border-danger" : ""}`;

        return (
            <div className="">
                <label>{field.label}</label>
                <div>
                    <input {...field.input} 
                        className={className}
                        type={field.type} 
                        placeholder={field.placeholder}/>
                
                <div className="text-danger">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
                </div>
            </div>
            )
    }

    onSubmit = (values) => {
        const newComment = {
            ...values,
            parentId: this.props.postId
        };

        if (this.props.page === "new") {
            this.props.createComment(newComment);
        } else {
            this.props.updateComment(this.props.comment.id, newComment);
            this.props.close();
        }
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="new-comment">
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    
                    
                    <Field
                        name="body"
                        type="text"
                        component={this.renderTextArea}
                        placeholder="Add a comment..."
                    />

                    <Field
                        name="author"
                        type="text"
                        component={this.renderField}
                        placeholder="User name"
                    />

                    <button type="submit" className="btn btn-secondary mt-2">Submit</button>
                </form>
            </div>
        )
    }
}

function validate(values) {
  const errors = {};

  if (!values.author) {
    errors.author = "Please enter a user name.";
  }

  if (!values.body) {
    errors.body = "Please enter a comment.";
  }

  return errors;
}

const mapStateToProps = (state) => {
  return {
    postId: state.selectedPost.id
  };
};

const resetForm = (result, dispatch) => {
    dispatch(reset('CommentForm'));
}

export default reduxForm({
    validate,
    form: 'CommentForm',
    onSubmitSuccess: resetForm
})(connect(mapStateToProps, {createComment, updateComment})(NewComment));