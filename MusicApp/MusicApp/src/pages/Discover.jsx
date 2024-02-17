import { Error, Loader, SongCard } from '../components';
import {genres} from "../assets/constants";
const Discover = () => {
    console.log(genres)

    return(
        <div className={"flex flex-col"}>Discover
            <div className={"sm:flex-row flex-col mt-4 mb-10 w-full flex justify-between items-center"}>
                <h2>Discover</h2>
                <select/>
            </div>
        </div>
    );
};

export default Discover;
