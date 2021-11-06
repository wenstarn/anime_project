import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./my-list-item.css"
import { addToMyList, removeFromMyList } from "../../actions"
import { connect } from "react-redux";



const MyListItem = ({ anime, addToMyList, removeFromMyList }) => {
    const [grade, setGrade] = useState(anime.grade);
    const [episodes, setEpisodes] = useState(anime.episodes);
    return (
        <Fragment>
            <td className="name">
                <Link to={`/animes/${anime.id}`}>{anime.name}</Link>
            </td>
            <td className="episodes">
                <div className="content-wrapper">
                    <input className="my-list-item-stats" type="text" value={episodes} onBlur={changeEpisodes(anime, episodes, addToMyList, removeFromMyList)}
                        onChange={handleEpisodesChange(setEpisodes, anime.episodesLimit)} />
                </div>
            </td>
            <td className="grade">
                <div className="content-wrapper">
                    <input className="my-list-item-stats" onBlur={changeGrade(anime, grade, addToMyList, removeFromMyList)} type="text"
                        onChange={handeGradeChange(setGrade)} value={grade} />
                </div>
            </td>
        </Fragment>
    )
}

const handleEpisodesChange = (setEpisodes, limit) => (event) => {
    let value = parseInt(event.target.value.replace(/\D/, ''))
    if (event.target.value == '') value = 0;
    if (value <= limit && value >= 0) {
        setEpisodes(value)
    }
}

const changeEpisodes = (anime, episodes, addToMyList, removeFromMyList) => () => {
    removeFromMyList(anime)
    const newItem = { ...anime, episodes }
    addToMyList(newItem);
}
const handeGradeChange = (setGrade) => (event) => {
    let value = parseInt(event.target.value.replace(/\D/, ''))
    if (event.target.value == '') value = 0;
    if (value <= 10 && value >= 0) {
        setGrade(value)
    }

}
const changeGrade = (anime, grade, addToMyList, removeFromMyList) => () => {
    console.log(anime)
    removeFromMyList(anime)
    const newItem = { ...anime, grade }
    addToMyList(newItem);
}

const actions = { addToMyList, removeFromMyList }
export default connect(null, actions)(MyListItem);