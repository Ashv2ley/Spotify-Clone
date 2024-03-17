import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '2f47f578e8msh1190959d4bc555ap10f306jsn27e203b1cd15');

            return headers;
        },

    }),
    endpoints: (build) => ({
        getTopCharts: build.query({ query: () => '/charts/track?pageSize=50' }),
        getSongDetails: build.query({ query: ({ songid }) => `/shazam-songs/get-details?id=${songid}`}),
        getRelatedSongs: build.query({query: ({ similarityId }) => `/shazam-songs/list-similarities?id=${similarityId}`}),
        getArtistDetails: build.query({query: ( artistid ) => `/artists/get-summary?id=${artistid}`}),
        getCountryTopSongs: build.query({ query: ( country ) => `/charts/track?locale=en-${country}`}),
        getSongsByGenre: build.query({ query: ( genreNumber ) => `/charts/track?listId=genre-country-chart-US-${genreNumber}`}),
        getSongsBySearch: build.query({ query: ( term ) => `/search?term=${term}`})
    }),
});



export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetRelatedSongsQuery,
    useGetArtistDetailsQuery,
    useGetCountryTopSongsQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery
} = shazamApi
