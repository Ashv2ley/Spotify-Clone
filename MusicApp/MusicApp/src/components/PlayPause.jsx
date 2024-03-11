import {FaPauseCircle, FaPlayCircle} from "react-icons/all";

const PlayPause = ({isPlaying, activeSong, song, handlePlay, handlePause}) => (

    isPlaying && activeSong?.title === song.title ?
        ( <FaPauseCircle
            size={40}
            className={"text-white"}
            onClick={handlePause}/> ) :
        (<FaPlayCircle
            size={40}
            className={"text-white"}
            onClick={handlePlay}/>)

);

export default PlayPause;
