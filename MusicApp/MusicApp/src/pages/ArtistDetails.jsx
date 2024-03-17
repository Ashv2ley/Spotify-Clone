import { useParams, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react'
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"
import {useGetArtistDetailsQuery} from "../redux/services/shazamApi";
import SongBar from "../components/SongBar";
const ArtistDetails = () => {
    const {id: artistid}  = useParams();
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const [artistSongs, setArtistSongs] = useState([])
    const { data: artistData, isFetching:isFetchingArtistDetails, error } = useGetArtistDetailsQuery( artistid )

    useEffect(() => {
        if (artistData) {
            const songsArray = []
            for (let key in artistData?.resources?.songs) {
                const currentObject = artistData?.resources?.songs[key];
                // console.log(currentObject?.attributes)
                songsArray.push(currentObject);
            }
            setArtistSongs(songsArray);
        }
        else{
            setArtistSongs([]);
        }
    }, [artistData]);


    if (isFetchingArtistDetails) return <Loader title={"Searching Artist Details"}/>;
    if (error) return <Error/>;

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, artistSongs, i}))
        dispatch(playPause(true));
    }

    // console.log(artistSongs)
    return(
        <div className={"flex flex-col"}>
            <DetailsHeader artistId={artistid} artistData={artistData?.resources?.artists[artistid]?.attributes}/>
            <h1 className={"text-white text-3xl font-bold mt-7"}>Discography:</h1>
            <div className={"mt-6 w-full flex flex-col"}>
                {artistSongs.map((song, i) =>
                    <SongBar
                        key={`${song?.id}`}
                        song={song}
                        i={i}
                        artistId={artistid}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        handlePauseClick={handlePauseClick}
                        handlePlayClick={handlePlayClick}
                    />
                )}
            </div>

        </div>
    )
}

export default ArtistDetails;
