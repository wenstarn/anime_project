import axios from 'axios';

export default class AnimeService {
    _apiBase = 'https://shikimori.one/api';
    getResource = async (url, config = {}) => {
        return (await axios.get(`${this._apiBase}${url}`, { params: config })).data;
    }

    getOngoings = async (num) => {
        const config = { status: "ongoing", order: "ranked", limit: num };
        const res = await this.getResource('/animes/', config);
        //res = await Promise.all(res.map(this._transformAnime));
        return res.map(this._transformAnime);
    }
    //30735 creates the mistake 
    getRandomCharacters = async (num) => {
        const idArray = [];
        const characters = [];
        let i = 0;
        while (i < num) {
            const id = Math.floor(Math.random() * 100000);
            if (id in idArray) continue
            else {
                idArray.push(id)
                try {
                    const res = await this.getResource(`/characters/${id}`);
                    characters.push(res);
                }
                catch {
                    console.log("mistake")
                    continue
                }
                i = i + 1;
            }
        }
        return characters.map(this._transformCharacter)
    }

    getAdditionalOngoings = async (page = 1, num = 10) => {
        const config = { status: "ongoing", order: "ranked", limit: num, page: page };
        const res = await this.getResource('/animes/', config);
        return res.map(this._transformAnime);

    }

    getAnime = async (id) => {
        const res = await this.getResource(`/animes/${id}`);
        return this._transformAnime(res);
    }

    searchAnimes = async (name, num = 10) => {
        const config = { order: "ranked", limit: num, search: name };
        const res = await this.getResource('/animes/', config);
        return res.map(this._transformAnime);
    }

    _transformAnime = (anime) => {
        return {
            ...anime,
            name: anime.russian,
            image: "https://shikimori.one" + anime.image.original,
            imageForSearch: "https://shikimori.one" + anime.image.x48
        }
    }

    _transformCharacter = (character) => {
        return {
            id: character.id,
            russian: character.russian,
            image: "https://shikimori.one" + character.image.original
        }
    }


}