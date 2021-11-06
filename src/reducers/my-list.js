const updateMyList = (state, action) => {
    if (state === undefined) {
        return {
            animes: []
        };
    }
    switch (action.type) {
        case 'REMOVE_FROM_MY_LIST': {
            console.log("REMOVE FROM MY LIST")
            console.log(action.payload)

            return {
                animes: state.myList.animes.filter(anime => anime.id != action.payload.id),
            }
        }
        case 'ADD_TO_MY_LIST': {
            console.log(state.myList.animes)
            console.log("ADD TO MY LIST")
            console.log(action.payload)
            return {
                animes: [...state.myList.animes, action.payload]
            }
        }
        default:
            return state.myList;
    }
}

export default updateMyList;