import { FaPauseCircle, FaPlayCircle } from "react-icons/all";

const PlayPause = ({ isPlaying, activeSong, song, handlePlay, handlePause }) => {
    const isActive = activeSong.title ? (activeSong?.title === song?.title) : (activeSong?.name === song?.name);
    return (
        isPlaying && isActive ? (
            <FaPauseCircle
                size={40}
                className="text-white"
                onClick={handlePause}
            />
        ) : (
            <FaPlayCircle
                size={40}
                className="text-white"
                onClick={handlePlay}
            />
        )
    );
};

export default PlayPause;

