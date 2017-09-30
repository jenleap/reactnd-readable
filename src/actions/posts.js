import axios from "axios";
import uuid from 'uuid';

export const ROOT_URL = 'http://localhost:3001';
export const config = {
    headers: { 'Authorization': 'jens-request' }
};

export function getPosts() {
    const request = axios.get(`${ROOT_URL}/posts`, config);

    return {
        type: 'FETCH_POSTS',
        payload: request
    };
}

export function getPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}`, config);

    return {
        type: 'FETCH_POST',
        payload: request
    };
}

export function createPost(values) {
    const newPost = {
        ...values,
        id: uuid(),
        timestamp: Date.now()
    }

    console.log(newPost);

    axios.post(`${ROOT_URL}/posts`, newPost, config);

    return {
        type: 'CREATE_POST',
        payload: newPost
    }
}

export function updatePost(id, values) {
    axios.put(`${ROOT_URL}/posts/${id}`, values, config);

    return {
        type: 'UPDATE_POST',
        id: id,
        payload: values
    }
}

export function deletePost(id) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}`, config);

    return {
        type: 'REMOVE_POST',
        payload: id
    }
}

export function updateVote(post, amount) {
    const newPost = {
        ...post,
        voteScore: post.voteScore + amount
    }

    axios.put(`${ROOT_URL}/posts/${post.id}`, newPost, config);

    return {
        type: 'UPDATE_VOTE',
        payload: newPost.voteScore
    }

}