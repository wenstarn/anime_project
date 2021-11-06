export const animeListRequested = () => {
    return {
        type: 'FETCH_ANIME_LIST_REQUEST'
    };
};

export const animeListLoaded = (ongoings) => {
    return {
        type: 'FETCH_ANIME_LIST_SUCCESS',
        payload: ongoings
    };
};

export const animeRequested = () => {
    return {
        type: 'FETCH_ANIME_REQUEST'
    };
};

export const animeLoaded = (anime) => {
    return {
        type: 'FETCH_ANIME_SUCCESS',
        payload: anime
    };
};

export const animeSearchListRequested = () => {
    return {
        type: 'FETCH_ANIME_SEARCH_LIST_REQUEST'
    };
};

export const animeSearchListLoaded = (animes) => {
    return {
        type: 'FETCH_ANIME_SEARCH_LIST_SUCCESS',
        payload: animes
    };
};

export const animeSearchListClear = () => {
    return {
        type: 'CLEAR_ANIME_SEARCH_LIST'
    };
}

export const animeListAnimesRequested = () => {
    return {
        type: 'UPLOAD_ANIMES_TO_ANIME_LIST_REQUEST',
    };
};

export const animeListAnimesLoaded = (animes) => {
    return {
        type: 'UPLOAD_ANIMES_TO_ANIME_LIST_SUCCESS',
        payload: animes
    };
};

export const makeListVisible = () => {
    return {
        type: 'MAKE_LIST_VISIBLE'
    }
}

export const makeListInvisible = () => {
    console.log("invisible")
    return {

        type: 'MAKE_LIST_INVISIBLE'
    }
}

export const typeAnimeSearch = (search) => {
    return {
        type: 'TYPE_ANIME_SEARCH',
        payload: search
    }
}

export const removeFromMyList = (anime) => {
    return {
        type: 'REMOVE_FROM_MY_LIST',
        payload: anime
    }
}

export const addToMyList = (anime) => {
    return {
        type: 'ADD_TO_MY_LIST',
        payload: anime
    }
}