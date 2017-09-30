import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost, updatePost, getPost } from './../actions/posts';
import {withRouter} from "react-router-dom";

import Titlebar from './Titlebar';

class NewPost extends Component {

    componentWillMount() {
        if (this.props.location.pathname !== "/posts/new") {
            this.props.getPost(this.props.match.params.id);
            this.initializeForm();
        }
    }

    initializeForm() {
        const initData = {
            "title": this.props.post.title,
            "author": this.props.post.author,
            "category": this.props.post.category,
            "body": this.props.post.body
        };
        this.props.initialize(initData);
    }


    renderField(field) {
        const className = `form-control ${field.meta.touched && field.meta.error ? "border border-danger" : ""}`;

        return (
            <div className="form-group">
                <label>{field.label}</label>
                <div>
                    <input {...field.input} 
                        className={className}
                        type={field.type} />
                
                <div className="text-danger">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
                </div>
            </div>
            )
    }

    renderSelectField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <div>
                <select {...field.input} 
                    className="form-control">
                    {field.categories.map( c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                </select>
                {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
            )
    }

    renderTextArea(field) {
        const className = `form-control ${field.meta.touched && field.meta.error ? "border border-danger" : ""}`;

        return (
            <div className="form-group">
                <label>{field.label}</label>
                <div>
                    <textarea {...field.input} 
                        className={className}
                        type={field.type} />
                
                <div className="text-danger">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
                </div>
            </div>
            )
    }

    onSubmit = (values) => {
        if (this.props.location.pathname === "/posts/new") {
            this.props.createPost(values);
            this.props.history.push("/");
        } else {
            this.props.updatePost(this.props.post.id, values);
            this.props.history.push("/");
        }
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="container">
            <Titlebar />
            <form 
                className="col-8 ml-3"
                onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                    name="title"
                    type="text"
                    component={this.renderField}
                    label="Title"
                />

                <Field
                    name="author"
                    type="text"
                    component={this.renderField}
                    label="Author"
                />

                <Field
                    name="category"
                    component={this.renderSelectField}
                    label="Category"
                    categories={this.props.categories}>
                    
                </Field>
                
                <Field
                    name="body"
                    type="text"
                    component={this.renderTextArea}
                    label="Body"
                />

                <button type="submit" className="btn btn-secondary">Submit</button>
                <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
            </form>
            </div>
        )
    }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Please enter a title.";
  }

  if (!values.author) {
    errors.author = "Please enter an author name.";
  }

  if (!values.category) {
    errors.category = "Please choose a category.";
  }

  if (!values.body) {
    errors.body = "Please enter a post body.";
  }

  return errors;
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    post: state.selectedPost
  };
};

const resetForm = (result, dispatch) => {
    dispatch(reset('PostForm'));
}

export default reduxForm({
    validate,
    form: 'PostForm',
    onSubmitSuccess: resetForm
})(withRouter(connect(mapStateToProps, {createPost, updatePost, getPost})(NewPost)));