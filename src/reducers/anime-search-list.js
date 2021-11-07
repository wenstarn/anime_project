const updateAnimeSearchList = (state, action) => {

    if (state === undefined) {
        return {
            visibility: 'hidden',
            animes: [],
            loading: true,
            error: null
        };
    }
    switch (action.type) {
        case 'FETCH_ANIME_SEARCH_LIST_REQUEST':
            return {
                ...state.animeSearchList,
                animes: [],
                loading: true,
                error: null,
            }

        case 'FETCH_ANIME_SEARCH_LIST_SUCCESS':
            return {
                ...state.animeSearchList,
                animes: action.payload,
                loading: false,
                error: null,
            }
        case 'FETCH_ANIME_SEARCH_LIST_FAILURE':
            return {
                ...state.animeSearchList,
                animes: [],
                loading: false,
                error: action.payload
            }
        case 'CLEAR_ANIME_SEARCH_LIST':
            return {
                ...state.animeSearchList,
                animes: [],
                loading: false,
                error: null,
            }

        case 'MAKE_LIST_VISIBLE':
            return {
                ...state.animeSearchList,
                visibility: 'visible'
            }
        case 'MAKE_LIST_INVISIBLE':
            console.log("hidden")
            return {
                ...state.animeSearchList,
                visibility: 'hidden'
            }
        default:
            return state.animeSearchList;
    }
}

export default updateAnimeSearchList;