import React from 'react';
import { FaVolumeMute, FaVolumeDown, FaVolumeUp } from "react-icons/fa";

const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
  <div className="flex flex-1 items-center justify-end">
    {value <= 1 && value > 0.5 && <FaVolumeUp size={23} color="#FFF" onClick={() => setVolume(0)} />}
    {value <= 0.5 && value > 0 && <FaVolumeDown size={23} color="#FFF" onClick={() => setVolume(0)} />}
      {value <= 0 && <FaVolumeMute size={23} color="#FFF" onClick={() => setVolume(1)} />}
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2 sm:w-28"
    />
  </div>
);

export default VolumeBar;
