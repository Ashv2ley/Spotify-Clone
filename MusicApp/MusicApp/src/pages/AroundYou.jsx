import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios'
import {useSelector} from "react-redux";
import {Error, Loader, SongCard} from "../components"
import {useGetCountryTopSongsQuery} from "../redux/services/shazamApi";

const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const {activeSong, isPlaying} = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetCountryTopSongsQuery( country )
    console.log(data)
    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_JXBt9UiWesXqky35Ql9Ss7L2NnYFB`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [country]);

    if (isFetching && loading) return <Loader title={"Loading Songs Around You"}/>
    if (error && country) return <Error/>

    return(
        <div className={"flex flex-col"}>
            <h1 className={"font-bold text-3xl text-white text-left mt-4 mb-10"}>Around You {country}</h1>
            <div className={"flex flex-wrap justify-center gap-7"}>
                {data?.tracks?.map((song, i) => (
                    <SongCard
                        song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data}/>
                ))
                }
            </div>
        </div>
    );
};

export default AroundYou;
