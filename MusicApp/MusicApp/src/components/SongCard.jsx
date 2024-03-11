import { Link }from 'react-router-dom'
import { useDispatch} from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {act} from "react-dom/test-utils";

const SongCard = ({song, i, isPlaying, activeSong, data}) => {
    const dispatch = useDispatch()
    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    const handlePlayClick = () => {
        dispatch(setActiveSong({song, data, i}))
        dispatch(playPause(true))
    }

    return (
      <div className={"flex flex-col w-[250px] p-4 bg-white/5 transition-colors duration-300 ease-in-out hover:bg-white/10 backdrop-blur-sm animate-slideup rounded-lg cursor pointer"}>
          <div className={"relative w-full h-56 group"}>
              <div className={`absolute bottom-4 right-2 transition-opacity group-hover:flex ${activeSong?.title === song.title ? 'flex bg-white/10 backdrop-blur-sm ' : 'hidden'}`}>
              <PlayPause
                  className={"play-pause"}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  song={song}
                  handlePause={handlePauseClick}
                  handlePlay={handlePlayClick}/>
              </div>
              <img alt={"song_img"} src={song.images?.coverart} className={"rounded-lg shadow-2xl"}/>
          </div>
          <div className={"mt-4 flex flex-col"}>
              <p className={"font-semibold text-lg text-white truncate"}>
                  <Link to={`/songs/${song?.key}`}>{song.title}</Link>
              </p>
              <p className={"text-sm text-gray-300 mt-1"}>
                  <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>{song.subtitle}</Link>
              </p>
          </div>
      </div>
)};

export default SongCard;
