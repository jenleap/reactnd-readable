export function posts(state = [], action) {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload.data
               .filter( p => ( p.deleted === false));
        case 'CREATE_POST':
            return [
                ...state,
                action.payload
            ];
        case 'REMOVE_POST':
            return state.filter( p => (
                p.id !== action.payload
            ));
        case 'UPDATE_POST':
            return state.map( p => {
                if (p.id === action.id) {
                    return {
                        ...p,
                        ...action.payload
                    };
                } else {
                    return p;
                }
            })
        default:
            return state;
    }
}

export function selectedPost(state = {}, action) {
    switch (action.type) {
        case 'FETCH_POST':
            return action.payload.data;
        case 'UPDATE_VOTE':
            return {
                ...state,
                voteScore: action.payload
            }
        default:
            return state;
    }
}