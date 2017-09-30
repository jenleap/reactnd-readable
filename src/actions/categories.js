import axios from "axios";

export const ROOT_URL = 'http://localhost:3001';
export const config = {
    headers: { 'Authorization': 'jens-request' }
};

export function getCategories() {
    const request = axios.get(`${ROOT_URL}/categories`, config);

    return {
        type: 'FETCH_CATEGORIES',
        payload: request
    };
}