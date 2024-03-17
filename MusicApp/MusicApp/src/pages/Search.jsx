import React from 'react';
import {useSelector} from "react-redux";
import {Error, Loader, SongCard} from "../components"
import {useGetSongsBySearchQuery} from "../redux/services/shazamApi";
import {useParams} from "react-router-dom";

const Search = () => {
    const term = useParams()["searchTerm"];
    const {activeSong, isPlaying} = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsBySearchQuery(term);

    const songs = data?.tracks?.hits?.map((song) => song.track);

    if (isFetching) return <Loader title={"Loading Songs Around You"}/>
    if (error) return <Error/>
    // console.log(term)

    return(
        <div className={"flex flex-col"}>
            <h1 className={"font-bold text-3xl text-white text-left mt-4 mb-10"}>Showing Results For: {term}</h1>
            <div className={"flex flex-wrap justify-center gap-7"}>
                {songs.map((song, i) => (
                    <SongCard
                        key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data}/>
                ))
                }
            </div>
        </div>
    );
};

export default Search;
