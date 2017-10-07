import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

import MainPage from './components/MainPage';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';

const store = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={store(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/"
                    render={() => (
                    <MainPage />
                    )}/>

                <Route exact path="/posts/new"
                    render={() => (
                    <NewPost />
                    )}/>
                
                <Route path="/posts/edit/:id"
                    render={() => (
                    <NewPost />
                    )}/>

                <Route exact path="/posts/detail/:id"
                    render={() => (
                    <PostDetail />
                    )}/>

                <Route path="/category/"
                    render={() => (
                        <MainPage />
                    )}/>
            </Switch>
        </BrowserRouter>
    </Provider>, 
 document.getElementById('root'));
registerServiceWorker();
