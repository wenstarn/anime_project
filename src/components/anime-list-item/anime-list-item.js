import React from "react";
import './anime-list-item.css';
import { Link } from 'react-router-dom';


const AnimeListItem = ({ id, title, image }) => {
    const url = `/animes/${id}`
    return (

        <div className="anime-item">
            <Link to={url} className="anime-field" onMouseOver={changeItemSize} onMouseOut={changeItemSize}>
                <img src={image} alt="cover" className="anime-image" />
                <footer className="text-light">
                    {title}
                </footer>
            </Link >
        </div>

    )
}

const changeItemSize = (event) => {
    const img = event.nativeEvent.path[1].children[0];
    if (event.type == "mouseover") {
        img.style.height = '334.4px'
        img.style.width = '100%';
    }

    else {
        img.style.height = '313.5px'
        img.style.width = '95%'
    }
}

export default AnimeListItem;