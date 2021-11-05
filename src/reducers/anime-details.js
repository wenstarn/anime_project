const updateAnimeDetails = (state, action) => {

    if (state === undefined) {
        return {
            anime: {},
            loading: true,
            error: null
        };
    }

    switch (action.type) {
        case 'FETCH_ANIME_REQUEST':
            console.log("anime req")

            return {
                anime: {},
                loading: true,
                error: null

            }
        case 'FETCH_ANIME_SUCCESS':
            console.log("anime success")
            return {
                anime: action.payload,
                loading: false,
                error: null
            }
        case 'FETCH_ANIME_FAILURE':
            return {
                anime: {},
                loading: false,
                error: action.payload
            };

        default:
            return state.animeDetails;
    }
}

export default updateAnimeDetails;