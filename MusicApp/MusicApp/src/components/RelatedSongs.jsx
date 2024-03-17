import SongBar from "./SongBar";
import {useState} from "react";
import {useEffect} from "react";

const RelatedSongs = ({data, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => {

    const [related, setRelated] = useState([])
    useEffect(() => {
        if (data) {
            const relatedArray = []
            for (let key in data.resources["shazam-songs"]) {
                const currentObject = data.resources["shazam-songs"][key];
                // console.log(currentObject?.attributes)
                relatedArray.push(currentObject);
            }
            setRelated(relatedArray);
        }
        else{
            setRelated([]);
        }
    }, [data]);
    // console.log(related)
    return(
        <div className={"flex flex-col"}>
            <h1 className={"mt-6 font-bold text-3xl text-white"}>Related Songs:</h1>
            <div className={"mt-6 w-full flex flex-col"}>
                {related.map((song, i) =>
                    <SongBar
                        key={`${song?.id}`}
                        song={song}
                        i={i}
                        artistId={""}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        handlePauseClick={handlePauseClick}
                        handlePlayClick={handlePlayClick}

                    />
                )}
            </div>

        </div>
    )
};

export default RelatedSongs;
