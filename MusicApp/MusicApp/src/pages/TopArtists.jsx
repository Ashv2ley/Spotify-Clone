import React from 'react';
import {useSelector} from "react-redux";
import {ArtistCard, Loader, Error} from "../components"
import {useGetTopChartsQuery} from "../redux/services/shazamApi";

const TopArtists = () => {
    const { data, isFetching, error } = useGetTopChartsQuery();
    console.log(data)
    return(
        <div className={"flex flex-col"}>
            <h1 className={"font-bold text-3xl text-white text-left mt-4 mb-10"}>Discover Top Artists</h1>
            <div className={"flex flex-wrap justify-center gap-7"}>
                {data?.tracks?.map((song) => (
                    <ArtistCard
                        key={song.key} track={song}/>
                ))
                }
            </div>
        </div>
    );
};

export default TopArtists;
