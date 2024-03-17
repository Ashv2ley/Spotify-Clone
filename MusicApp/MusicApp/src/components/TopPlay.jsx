import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery }  from "../redux/services/shazamApi";

import 'swiper/css';
import 'swiper/css/free-mode';
import PlayPause from "./PlayPause";

const TopChartCard = ({song, index, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
    <div className={"w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg mb-2"}>
        <h3 className={"font-semibold text-white text-base mr-3"}>{index+1}.</h3>
        <div className={"flex-1 flex flex-row justify-between items-center"}>
            <img src={song?.images?.coverart} alt={song?.title} className={"w-20 rounded-lg"}/>
            <div className={"flex-1 flex flex-col justify-center mx-3"}>
                <Link to={`/songs/${song?.key}`} state={song}>
                    <h1 className={"text-white text-xl font-semibold"}>{song?.title}</h1>
                </Link>
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                    <h2 className={"text-gray-400 mt-1"}>{song?.subtitle}</h2>
                </Link>
            </div>
        </div>
        <div className={"cursor-pointer"}>
            <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
            />
        </div>

    </div>
)

const TopPlay = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data } = useGetTopChartsQuery();
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({behavior: "smooth"});
    });

    const topPlays = data?.tracks.slice(0,5);
    // console.log(data)

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, data, i}))
        dispatch(playPause(true));
    }

    return(
        <div ref={divRef} className={"xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"} >
            <div className={"w-full flex flex-col"}>
                <div className={"flex flex-row justify-between items-center"}>
                    <h2 className={"flex flex-row text-white font-bold text-2xl"}>Top Charts</h2>
                    <Link to={"/top-charts"}>
                        <p className={"text-gray-300 text-base cursor-pointer"}>See More</p>
                    </Link>
                </div>

                <div className={"mt-4 flex flex-col gap-1"}>
                    {topPlays?.map((song, i) => <TopChartCard
                        key={song.key}
                        song={song}
                        index={i}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        handlePauseClick={handlePauseClick}
                        handlePlayClick={() => handlePlayClick(song, i)}
                    />)}
                </div>

                <div className={"w-full flex flex-col mt-8"}>
                    <div className={"flex flex-row justify-between items-center"}>
                        <h2 className={"text-white font-bold text-2xl"}>Top Artists</h2>
                        <Link to={"/top-artists"}>
                            <p className={"text-gray-300 text-base cursor-pointer"}>See More</p>
                        </Link>

                    </div>
                </div>



                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={15}
                    freeMode
                    centeredSlides
                    centeredSlidesBounds
                    modules={[FreeMode]}
                    className={"mt-4"}>
                    {topPlays?.map((song, index) => (
                        <SwiperSlide key={song?.key} style={{width: "25%", height: "auto"}} className={"shadow-lg rounded-full animate-slideright"}>
                            <Link to={`/artists/${song?.artists[0].adamid}`}>
                                <img src={song?.images.background} alt={"artist-image"} className={"rounded-full w-full object-cover"}/>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopPlay;
