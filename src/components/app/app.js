import React from 'react'
import AnimeHeader from '../anime-header'
import AnimeList from '../anime-list'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AnimeDetails from '../anime-details';
import AnimeSearchList from '../anime-search-list';
import './app.css'

const App = () => {
    return (
        <main className="bg-dark" style={{ minHeight: "100vh" }} >
            <AnimeHeader />
            <AnimeSearchList />
            <Switch>
                <Route path="/animes/search/:name" render={() => {
                    console.log('ROUUUUTE');
                    return (
                        <AnimeList url={"rrrr"} />
                    )
                }} exact />


                <Route path="/animes" component={AnimeList} exact />

                <Route path="/animes/:id" render={({ match }) => {
                    console.log("shiiiiift")
                    const { id } = match.params;
                    return <AnimeDetails id={id} />
                }} exact />

            </Switch>
        </main >
    );
};

export default App;