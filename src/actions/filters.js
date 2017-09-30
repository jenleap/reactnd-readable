export function sortByPopular() {
    return {
        type: 'SORT_BY_POPULAR'
    };
}

export function sortByRecent() {
    return {
        type: 'SORT_BY_RECENT'
    };
}

export function selectCategory(category) {
    return {
        type: 'SET_CATEGORY',
        category: category
    };
}
