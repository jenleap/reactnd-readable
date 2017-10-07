import axios from "axios";
import uuid from 'uuid';

export const ROOT_URL = 'http://localhost:3001';
export const config = {
    headers: { 'Authorization': 'jens-request' }
};

export function getAllComments() {
    const request = axios.get(`${ROOT_URL}/comments`, config);

    return {
        type: 'FETCH_ALL_COMMENTS',
        payload: request
    };
}

export function getComments(postId) {
    const request = axios.get(`${ROOT_URL}/posts/${postId}/comments`, config);

    return {
        type: 'FETCH_COMMENTS',
        payload: request
    };
}

export function getComment(id) {
    const request = axios.get(`${ROOT_URL}/comments/${id}`, config);

    return {
        type: 'FETCH_COMMENT',
        payload: request
    };
}

export function createComment(values, callback) {
    const newPost = {
        ...values,
        id: uuid(),
        timestamp: Date.now(),
        voteScore: 1
    }

    axios.post(`${ROOT_URL}/comments`, newPost, config);

    return {
        type: 'CREATE_COMMENT',
        payload: newPost
    }
}

export function updateComment(id, values, callback) {
    axios.put(`${ROOT_URL}/comments/${id}`, values, config);

    return {
        type: 'UPDATE_COMMENT',
        id: id,
        payload: values
    }
}

export function deleteComment(id) {
    axios.delete(`${ROOT_URL}/comments/${id}`, config);

    return {
        type: 'REMOVE_COMMENT',
        payload: id
    }
}

export function voteComment(comment, amount) {

    const newComment = {
        ...comment,
        voteScore: comment.voteScore + amount
    }

    axios.put(`${ROOT_URL}/comments/${comment.id}`, newComment, config);

    return {
        type: 'UPDATE_COMMENT',
        id: newComment.id,
        payload: newComment
    }

}

