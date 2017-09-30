export function comments(state = [], action) {
    switch (action.type) {
        case 'FETCH_COMMENTS':
            return action.payload.data
                .filter( c => ( c.deleted === false))
                .sort((a, b) => {
                    return a.voteScore < b.voteScore ? 1 : -1;
                });;
        case 'CREATE_COMMENT':
            return [
                ...state,
                action.payload
            ];
        case 'REMOVE_COMMENT':
            return state.filter( c => (
                c.id !== action.payload
            ));
        case 'UPDATE_COMMENT':
            return state.map( p => {
                if (p.id === action.id) {
                    return {
                        ...p,
                        ...action.payload
                    };
                } else {
                    return p;
                }
            });
        default:
            return state;
    }
}

export function selectedComment(state = {}, action) {
    switch (action.type) {
        case 'FETCH_COMMENT':
            return action.payload.data;
        default:
            return state;
    }
}