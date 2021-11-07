const updateAnimeList = (state, action) => {

    if (state === undefined) {
        return {
            animes: [],
            loading: true,
            error: null,
            page: 1
        };
    }
    switch (action.type) {
        case 'FETCH_ANIME_LIST_REQUEST':
            return {
                animes: [],
                loading: true,
                error: null,
                page: 1
            }
        case 'FETCH_ANIME_LIST_SUCCESS':
            return {
                animes: action.payload,
                loading: false,
                error: null,
                page: 1
            }
        case 'FETCH_ANIME_LIST_FAILURE':
            return {
                animes: [],
                loading: false,
                error: action.payload,
                page: 1
            };
        case 'UPLOAD_ANIMES_TO_ANIME_LIST_REQUEST':
            return {
                animes: [...state.animeList.animes],
                loading: true,
                error: null,
                page: state.animeList.page + 1
            }
        case 'UPLOAD_ANIMES_TO_ANIME_LIST_SUCCESS':
            return {
                animes: [...state.animeList.animes, ...action.payload],
                loading: false,
                error: null,
                page: state.animeList.page
            }
        default:
            return state.animeList;
    }
}

export default updateAnimeList;