import React, { Component } from "react";
import './anime-list.css';
import AnimeListItem from "../anime-list-item";
import { connect } from "react-redux";
import withAnimeService from "../hoc";
import * as actions from '../../actions'
import { withRouter } from "react-router";
import * as qs from 'qs';


const AnimeList = ({ animes }) => {
    return (
        <ul className="anime-list">
            {
                animes.map((anime) => {
                    return (
                        <li key={anime.id} >
                            <AnimeListItem title={anime.name} image={anime.image} id={anime.id} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

class AnimeListContainer extends Component {

    componentDidMount() {
        this.props.animeListRequested()
        this.searchCheck()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const { search } = (qs.parse(this.props.location.search, { ignoreQueryPrefix: true }))
            this.props.animeListRequested()
            this.searchCheck()
        }
    }

    searchCheck() {
        const { search } = (qs.parse(this.props.location.search, { ignoreQueryPrefix: true }))
        if (search) {
            this.props.animeService.searchAnimes(search, 30).then(res => this.props.animeListLoaded(res))
            window.removeEventListener('scroll', this.scroll, false)
        }
        else {
            this.props.animeService.getOngoings(15).then(res => this.props.animeListLoaded(res))
            window.addEventListener('scroll', this.scroll, false)

        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll, false)
    }

    scroll = () => {
        const block = document.querySelector('.anime-list');
        const contentHeight = block.offsetHeight;
        const yOffset = window.pageYOffset;
        const window_height = window.innerHeight;
        const y = yOffset + window_height;
        if (y >= contentHeight) {
            console.log(this)
            this.props.animeListAnimesRequested()
            this.props.animeService.getAdditionalOngoings(this.props.page, 15).then(res => this.props.animeListAnimesLoaded(res))
        }
    }
    render() {
        return <AnimeList animes={this.props.animes} />
    }

}

const mapStatetoProps = ({ animeList: { animes, loading, error, page } }) => {
    return { animes, loading, error, page };
};

export default withRouter(withAnimeService()(connect(mapStatetoProps, actions)(AnimeListContainer)))