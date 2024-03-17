import { useParams, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react'
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"
import {useGetSongDetailsQuery, useGetRelatedSongsQuery} from "../redux/services/shazamApi";
import PlayPause from "../components/PlayPause";
import SongBar from "../components/SongBar";

const SongDetails = () => {
    const location = useLocation()
    const song = location.state
    const [lyrics, setLyrics] = useState(null)
    const {songid}  = useParams();

    const { data:songData, isFetching:isFetchingSongDetails } = useGetSongDetailsQuery({ songid })
    // console.log(song)
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const similarityId = songData?.resources["related-tracks"][`track-similarities-id-${songid}`]?.id
    const { data, isFetching:isFetchingRelatedSongs, error } = useGetRelatedSongsQuery({ similarityId })

    useEffect(() => {
        if (songData?.resources?.lyrics) {
            for (let key in songData?.resources?.lyrics) {
                const currentObject = songData?.resources?.lyrics[key];
                setLyrics(currentObject.attributes?.text);
            }
        }
        else{
            setLyrics(null);
        }

    });

    if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title={"Searching Song Details"}/>;
    if (error) return <Error/>;

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, data, i}))
        dispatch(playPause(true));
    }
    return(
        <div className={"flex flex-col"}>
            <DetailsHeader artistId={""} artistData={song} songData={songData} songid={songid}/>
            <div className={"mt-6 cursor-pointer"}>
                    <PlayPause
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        handlePause={handlePauseClick}
                        handlePlay={() => handlePlayClick(song, 1)}
                    />
            </div>
            <h1 className={"text-white text-3xl font-bold mt-7"}>Lyrics:</h1>
            <div className={"mt-5"}>{lyrics ? lyrics.map((line, i) => (
                <p className={"text-gray-400 text-base text-md my-1"}>{line}</p>)) : <p className={"text-gray-400 text-base text-xl my-1"}>Sorry, No Lyrics Found</p>}
            </div>

                <RelatedSongs
                    data={data}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                />

        </div>
    )
}

export default SongDetails;
