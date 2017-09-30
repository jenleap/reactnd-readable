export function getSelectedPosts(posts, filters) {
    return posts.filter( post => {
        if (filters.category.length > 0) {
            return post.category === filters.category;
        } else {
            return post;
        }
    }).sort((a, b) => {
        if (filters.sortBy === 'popular') {
            return a.voteScore < b.voteScore ? 1 : -1;
        } else if (filters.sortBy === 'recent') {
            return a.timestamp < b.timestamp ? 1 : -1;
        }
    });
};