import React, { Component, useEffect, useState } from "react";
import './anime-details.css'
import { connect } from "react-redux";
import withAnimeService from "../hoc";
import * as actions from '../../actions'
import { withRouter } from "react-router";


const AnimeDetails = ({ anime, removeAnime, addAnime, myList, episodesRef, gradeRef }) => {
    const animeListItem = myList.find(animeListItem => animeListItem.id === anime.id);
    const [category, setCategory] = useState("No category")
    const [episodes, setEpisodes] = useState(0)
    const [grade, setGrade] = useState(0)
    useEffect(() => {
        if (animeListItem) {
            setCategory(animeListItem.category);
            setEpisodes(animeListItem.episodes);
            setGrade(animeListItem.grade);
        }
        else {
            setCategory("No category")
            setEpisodes(0)
            setGrade(0)
        }

        if (category === "No category") {
            episodesRef.current.style.visibility = "hidden"
            gradeRef.current.style.visibility = "hidden"
            episodesRef.current.style.position = "absolute"
            gradeRef.current.style.position = "absolute"

        }
        else {
            episodesRef.current.style.visibility = "visible"
            gradeRef.current.style.visibility = "visible"
            episodesRef.current.style.position = "static"
            gradeRef.current.style.position = "static"
        }

        if (category === "Watched" || category === "No category") {
            episodesRef.current.children[1].children[0].style.visibility = "hidden"
            episodesRef.current.children[1].children[1].style.visibility = "hidden"
        }
        else {
            episodesRef.current.children[1].children[0].style.visibility = "visible"
            episodesRef.current.children[1].children[1].style.visibility = "visible"
        }
    })
    return (
        <div className="container-fluid mt-5 text-light" >
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 d-flex flex-column justify-content-center">
                    <img src={anime.image} className="img-fluid rounded mb-3 " />
                    <select value={category} onChange={selectCategory({ category, episodes, grade },
                        { removeAnime, addAnime, anime })} class="custom-select mb-3">
                        <option value="No category">Нет категории</option>
                        <option value="Scheduled">Запланированно</option>
                        <option value="Watching">Смотрю</option>
                        <option value="Watched">Просмотрено</option>
                        <option value="Dropped">Брошено</option>
                    </select>
                    <div ref={episodesRef} className="mb-3 d-flex justify-content-between align-items-center" style={{ visibility: "hidden", position: "absolute" }}>
                        <span className="">Эпизоды: <span>{episodes}</span>/<span>{anime.episodes > 0 ? anime.episodes : anime.episodes_aired}</span></span>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" onClick={pushButton(-1, { category, episodes, grade },
                                { removeAnime, addAnime, anime })} class="btn btn-danger">-</button>
                            <button type="button" onClick={pushButton(1, { category, episodes, grade },
                                { removeAnime, addAnime, anime })} class="btn btn-success">+</button>
                        </div>
                    </div>
                    <div ref={gradeRef} className="mb-3 d-flex justify-content-center align-items-baseline" style={{ visibility: "hidden", position: "absolute" }}>
                        <span className="col-5 p-0" style={{ display: "inline-block" }}>Оценка:</span>
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-warning" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                            </svg></span>
                            <input type="number" value={grade} onChange={addGrade({ category, episodes, grade },
                                { removeAnime, addAnime, anime })} className="form-control" placeholder="Оценка" aria-label="Grade" aria-describedby="basic-addon1" max="10" min="0" />
                        </div>

                    </div>
                </div>
                <div className="col">
                    <h1 className="">{anime.name}</h1>
                    <ul className="p-0">
                        <li className="mb-3">Рейтинг: <span className="text-secondary">{anime.score}</span></li>
                        <li className="mb-3">Количество эпизодов:  <span className="text-secondary">{anime.episodes > 0 ? anime.episodes : anime.episodes_aired}</span></li>
                        <li className="mb-3">Жанры: {anime.genres.map((genre, index) => {

                            if (index !== anime.genres.length - 1) {
                                return (
                                    <span className="text-secondary"> {genre.russian},</span>
                                )
                            }
                            else {
                                return (
                                    <span className="text-secondary"> {genre.russian}</span>
                                )
                            }
                        }
                        )}</li>
                        <li className="mb-3">Описание: <span className="text-secondary">{anime.description}</span></li>
                    </ul>
                </div>

            </div>
        </div >

    )
}

const selectCategory = (state, animeServ) => (event) => {
    let { category, episodes, grade } = state;
    const { removeAnime, addAnime, anime } = animeServ;
    const episodesLimit = anime.episodes > 0 ? anime.episodes : anime.episodes_aired;
    removeAnime(anime)
    if (event.target.value !== "No category") {
        if (event.target.value === "Watched") episodes = episodesLimit;
        const animeItem = { id: anime.id, name: anime.name, episodes, grade, category: event.target.value, episodesLimit }
        addAnime(animeItem)
    }
}

const pushButton = (number, state, animeServ) => (event) => {
    let { category, episodes, grade } = state;
    const { removeAnime, addAnime, anime } = animeServ;
    console.log("im add")
    let episodesNum = episodes + number;
    console.log(episodesNum)
    const episodesLimit = anime.episodes > 0 ? anime.episodes : anime.episodes_aired;
    removeAnime(anime)
    if (episodesNum < 0) episodesNum = 0
    if (episodesNum >= episodesLimit) {
        episodesNum = episodesLimit
        category = "Watched"
    }
    const animeItem = { id: anime.id, name: anime.name, episodes: episodesNum, grade, category, episodesLimit }
    addAnime(animeItem)
}

const addGrade = (state, animeServ) => (event) => {
    let { category, episodes, grade } = state;
    const { removeAnime, addAnime, anime } = animeServ;
    const episodesLimit = anime.episodes > 0 ? anime.episodes : anime.episodes_aired;
    let value = event.target.value;
    if (value > 10) value = 10
    if (value < 0) value = 0
    removeAnime(anime)
    const animeItem = { id: anime.id, name: anime.name, episodes, grade: value, category, episodesLimit }
    addAnime(animeItem)
}
class AnimeDetailsContainer extends Component {
    constructor(props) {
        super(props)
        this.episodes = React.createRef();
        this.grade = React.createRef();
        this.category = React.createRef();

    }

    componentDidMount() {
        this.props.animeRequested()
        this.props.animeService.getAnime(this.props.id).then(res => this.props.animeLoaded(res))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location != this.props.location) {
            console.log("detail update")

            this.props.animeRequested()
            this.props.animeService.getAnime(this.props.id).then(res => this.props.animeLoaded(res))
        }

    }

    render() {
        if (Object.keys(this.props.anime).length) {
            return <AnimeDetails anime={this.props.anime} episodesRef={this.episodes}
                gradeRef={this.grade} removeAnime={this.props.removeFromMyList} addAnime={this.props.addToMyList}
                myList={this.props.animes} category={this.category} />
        }
        else {
            return "nnnn"
        }
    }
}



const mapStatetoProps = ({ animeDetails: { anime, loading, error }, myList: { animes } }) => {
    return { anime, loading, error, animes };
};

export default withRouter(withAnimeService()(connect(mapStatetoProps, actions)(AnimeDetailsContainer)))
