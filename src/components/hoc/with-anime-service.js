import React from "react";
import { AnimeServiceConsumer, AnimeServiceProvider } from "../anime-service-context";

const withAnimeService = () => (Wrapped) => {

    return (props) => {
        return (
            <AnimeServiceConsumer>
                {
                    (animeService) => {
                        return (<Wrapped {...props}
                            animeService={animeService} />);
                    }
                }
            </AnimeServiceConsumer>
        )
    }
}

export default withAnimeService;