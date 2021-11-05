import React from "react";
import { connect } from "react-redux";
import './anime-search-list.css'
import AnimeSearchListItem from "../anime-search-list-item";
import { makeListInvisible } from '../../actions'
const AnimeSearchList = ({ animes, visibility, search, makeListInvisible }) => {
    console.log('this visibility')
    console.log(visibility)
    console.log(animes)
    console.log(search)
    return (
        <div className="lay" style={{ visibility: visibility }} onClick={() => makeListInvisible()}>
            <div className="search-list d-flex justify-content-start flex-direction-column">
                <ul class="scroll" style={{ color: "black" }}>
                    {
                        animes.map((anime) => {
                            return (
                                <li key={anime.id} className="search-item border border-dark border-bottom-5">
                                    <AnimeSearchListItem name={anime.name} id={anime.id} image={anime.imageForSearch} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = ({ animeSearchList: { animes, visibility, search } }) => {
    return { animes, visibility, search }

}

const actions = { makeListInvisible }


export default connect(mapStateToProps, actions)(AnimeSearchList);