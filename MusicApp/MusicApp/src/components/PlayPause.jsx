import {FaPauseCircle, FaPlayCircle} from "react-icons/all";

const PlayPause = ({isPlaying, activeSong, song, handlePlay, handlePause}) => (

    isPlaying && activeSong?.title === song.title ?
        ( <FaPauseCircle
            size={50}
            className={"text-green-700"}
            onClick={handlePause}/> ) :
        (<FaPlayCircle
            size={50}
            className={"text-green-700"}
            onClick={handlePlay}/>)

);

export default PlayPause;
