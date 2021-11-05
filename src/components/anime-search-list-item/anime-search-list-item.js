import React from "react";
import './anime-search-list-item.css';
import { Link } from 'react-router-dom';


const AnimeSearchListItem = ({ id, name, image }) => {
    const url = `/animes/${id}`
    return (
        <Link to={url}>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <img src={image} className="anime-image-for-search" />
                    </div>
                    <div class="col-9 d-flex flex-column justify-content-center text-start">
                        <span className="anime-name-search">{name}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AnimeSearchListItem;