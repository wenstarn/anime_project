import React, { Component } from "react";
import './anime-header.css'
import withAnimeService from "../hoc";
import { connect } from "react-redux";
import {
    animeSearchListRequested, animeSearchListLoaded, animeSearchListClear,
    makeListVisible, makeListInvisible
} from '../../actions'
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import store from "../../store";


const AnimeHeader = ({ animeService, animeSearchListRequested, animeSearchListLoaded,
    animeSearchListClear, makeListVisible, history, makeListInvisible }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark  sticky-top">
            <a className="navbar-brand" href="#">Anime</a>
            <button onClick={() => makeListInvisible()} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/animes">Ongoings<span class="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" href="#">My list</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" href="#">Games</Link>
                    </li>
                </ul>
                <form className="search-form form-inline my-2 my-lg-0" style={{ zIndex: '99999' }} action="/animes">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                        onClick={searchClick(makeListVisible)} onInput={searchAnimes(animeService,
                            animeSearchListRequested, animeSearchListLoaded, animeSearchListClear,
                            makeListVisible)} name="search" />
                    <button className="btn btn-outline-light my-2 my-sm-0" type="button" onClick={pushSearchButton(history)}  >Search</button>
                </form>
            </div >
        </nav >
    )
}

const pushSearchButton = (history) => (event) => {
    const value = document.querySelector('.search-form').children[0].value;
    history.push(`/animes?search=${value}`);

}

const searchAnimes = (animeService, request, loading, clearing, visible) => (event) => {
    visible();
    if (event.target.value.length === 0) {
        clearing();
    }
    else {
        request();
        animeService.searchAnimes(event.target.value).then(res => loading(res))
    }
}

//Make refactoring 

const searchClick = (visible) => (event) => {
    const form = document.querySelector('.search-form');
    const nav = document.querySelector('nav');
    const searchList = document.querySelector('.search-list');

    document.querySelector('.lay').style.visibility = "visible"
    visible();
    searchList.style.width = window.getComputedStyle(form).getPropertyValue("width")
    searchList.style.top = window.getComputedStyle(nav).getPropertyValue("height")
    searchList.style.right = window.getComputedStyle(nav).getPropertyValue("padding-right")

}

let shift = false;
window.addEventListener(`resize`, event => {

    const form = document.querySelector('.search-form')
    const nav = document.querySelector('nav');
    const toggle = document.querySelector('.navbar-toggler');
    if (window.getComputedStyle(toggle).getPropertyValue("display") != 'none' && shift === false) {
        document.querySelector('.lay').style.visibility = "hidden"
        store.dispatch(makeListInvisible())
        shift = true;
    }

    if (window.getComputedStyle(toggle).getPropertyValue("display") != 'block' && shift === true) {
        document.querySelector('.lay').style.visibility = "hidden"
        //makeListInvisible()
        store.dispatch(makeListInvisible())
        shift = false;
    }
    const searchList = document.querySelector('.search-list');
    searchList.style.width = window.getComputedStyle(form).getPropertyValue("width")
    searchList.style.top = window.getComputedStyle(nav).getPropertyValue("height")
    searchList.style.right = window.getComputedStyle(nav).getPropertyValue("padding-right")
}, false);



//Make refactoring 

const actions = {
    animeSearchListRequested, animeSearchListLoaded,
    animeSearchListClear, makeListVisible, makeListInvisible
}

export default withRouter(withAnimeService()(connect(null, actions)(AnimeHeader)));

