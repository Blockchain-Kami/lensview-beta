export const createTags = (tags, query) => {

    const keys = Array.from(query.keys());

    for ( let i = 0; i < keys.length; i++ ){
        if( query.get(keys[i]).length < 50 ) {
            tags.push(keys[i] + '=' + query.get(keys[i]));
        }
    }

    return tags;
}