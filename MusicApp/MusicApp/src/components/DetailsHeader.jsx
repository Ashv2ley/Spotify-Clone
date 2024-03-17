import {Link} from 'react-router-dom'

const DetailsHeader = ({artistId, artistData, songData, songid, artistImage}) => (
  <div className={"relative w-full flex flex-col"}>
      <div className={"w-full bg-gradient-to-l from-transparent to-black sm:h-45 h-40 rounded-full"}/>
        <div className={"absolute inset-0 flex items-center"}>
            <img src={artistId ? artistData?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : songData?.resources["shazam-songs"][songid]?.attributes?.images?.coverArt || songData?.resources["shazam-songs"][songid]?.attributes?.artwork?.url} alt={"artist-image"} className={"sm:w-40 w-32 sm:h-40 h-32 rounded-full object-cover border-2 shadow-xl shadow-black"}/>
            <div className={"ml-5"}>
                <p className={"font-bold sm:text-lg text-xl text-white"}>
                    {artistId ? artistData?.name : songData?.resources["shazam-songs"][songid]?.attributes?.title}
                </p>
                {!artistId && (artistData?.artists ? (
                    <Link to={`/artists/${artistData.artists[0].adamid}`}>
                        <p className="text-base text-gray-400 mt">
                            {songData?.resources["shazam-songs"][songid]?.attributes?.artist}
                        </p>
                    </Link>
                    ) : (<Link to={`/artists/${artistData?.relationships?.artists?.data[0].id}`}>
                    <p className="text-base text-gray-400 mt">
                        {songData?.resources["shazam-songs"][songid]?.attributes?.artist}
                    </p>
                </Link>))
                }

                <p className={"text-base text-gray-200 mt-1"}>
                    {artistId ? artistData?.genreNames[0]: songData?.resources["shazam-songs"][songid]?.attributes?.genres?.primary}
                </p>

            </div>
        </div>
  </div>
);

export default DetailsHeader;
