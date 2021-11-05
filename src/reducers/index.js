import updateAnimeDetails from "./anime-details";
import updateAnimeList from "./anime-list";
import updateAnimeSearchList from "./anime-search-list";
import updateMyList from "./my-list";

const reducer = (state, action) => {
    return {
        animeList: updateAnimeList(state, action),
        animeDetails: updateAnimeDetails(state, action),
        animeSearchList: updateAnimeSearchList(state, action),
        myList: updateMyList(state, action)
    }
}

export default reducer;