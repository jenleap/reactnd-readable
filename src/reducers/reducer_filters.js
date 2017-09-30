const defaultFilter = {
    sortBy: 'popular',
    category: ''
};


export function filters(state = defaultFilter, action) {
    switch (action.type) {
        case 'SORT_BY_POPULAR':
            return {
                ...state,
                sortBy: 'popular'
            };
        case 'SORT_BY_RECENT':
            return {
                ...state,
                sortBy: 'recent'
            };
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.category
            };
        default:
            return state;
    }
}