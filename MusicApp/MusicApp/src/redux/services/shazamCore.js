import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '551f7bd198msh1e926d3a22a8ea4p131601jsn9e617e2fbb23',
        'X-RapidAPI-Host': 'shazam-core7.p.rapidapi.com'
    }
};

fetch('https://shazam-core7.p.rapidapi.com/charts/get-top-songs-in-world', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


export const shazamCoreApi = createApi({
    reducerPath: 'shazamCorApi'
})