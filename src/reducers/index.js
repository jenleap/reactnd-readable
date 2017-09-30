import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { categories } from './reducer_categories';
import { posts, selectedPost } from './reducer_posts';
import { comments, selectedComment } from './reducer_comments';
import { filters } from './reducer_filters';

const rootReducer = combineReducers({
    categories,
    posts,
    selectedPost,
    comments,
    selectedComment,
    filters,
    form: formReducer
});

export default rootReducer;