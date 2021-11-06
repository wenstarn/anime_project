import React, { Fragment } from "react";
import MyListItem from "../my-list-item";
import { connect } from "react-redux";
import "./my-list.css"

const Table = ({ animes }) => {
    console.log(animes)
    return (
        <table class="table table-dark">
            <thead>
                <tr>
                    <th className="index" scope="col">#</th>
                    <th className="name" scope="col">Название</th>
                    <th className="episodes" scope="col">Количество Эпизодов</th>
                    <th className="grade" scope="col">Оценка</th>
                </tr>
            </thead>
            <tbody>
                {animes.map((anime, index) => {
                    return (
                        <tr key={anime.id}>
                            <th className="index" scope="row">{index + 1}</th>
                            <MyListItem anime={anime} />
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const MyList = ({ animes }) => {
    const scheduled = animes.filter(anime => anime.category === "Scheduled");
    const watching = animes.filter(anime => anime.category === "Watching");
    const watched = animes.filter(anime => anime.category === "Watched");
    const dropped = animes.filter(anime => anime.category === "Dropped");


    return (
        <Fragment>
            <h1 className="text-light text-center">Запланированное</h1>
            <Table animes={scheduled} />
            <h1 className="text-light text-center">Смотрю</h1>
            <Table animes={watching} />
            <h1 className="text-light text-center">Просмотрено</h1>
            <Table animes={watched} />
            <h1 className="text-light text-center">Брошено</h1>
            <Table animes={dropped} />
        </Fragment>
    )
}

const mapStatetoProps = ({ myList: { animes } }) => {
    return { animes };
};

export default connect(mapStatetoProps)(MyList);