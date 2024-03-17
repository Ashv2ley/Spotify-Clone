import {useNavigate} from "react-router-dom";

const ArtistCard = ({track}) => {
  const navigate = useNavigate();

  return(
      <div className={"flex flex-col w-[140px] h-[190px] lg:w-[200px] lg:h-[250px] p-4 bg-white/5 transition-colors duration-300 ease-in-out hover:bg-white/10 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"} onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}>
        <img src={track?.images?.background} alt={"artist"} className={"w-full sm:h-52 h-36 rounded-lg"}/>
        <p className={"mt-4 font-semibold text-lg text-white truncate"}>{track?.subtitle}</p>
      </div>
  )
};

export default ArtistCard;
