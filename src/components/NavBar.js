import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from './../actions/posts';
import { getCategories } from './../actions/categories';
import { selectCategory } from './../actions/filters';

class NavBar extends Component {

  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="nav-bar">
        <Link to={`/category/allposts`}>
          <div 
              className="all-posts"
              onClick={() => this.props.selectCategory("")}
          >
            <h4>All Posts</h4>
          </div>
        </Link>
        <h4 className="text-secondary">Categories</h4>
        <div className="ml-4">
        {this.props.categories.map( c => {
          return (
            <Link 
              key={c.path}
              to={`/category/${c.name}`}>
              <div 
                className="nav-categories"
                onClick={() => this.props.selectCategory(c.name)}
                >
                  {c.name}
              </div>
            </Link>
          )
        })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    getPosts: () => dispatch(getPosts()),
    selectCategory: (category) => dispatch(selectCategory(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);

