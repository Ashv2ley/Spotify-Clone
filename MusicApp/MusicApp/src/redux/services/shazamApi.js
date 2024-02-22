import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '551f7bd198msh1e926d3a22a8ea4p131601jsn9e617e2fbb23');

            return headers;
        },

    }),
    endpoints: build => ({
        getTopCharts: build.query({query: () => '/charts/track?pageSize=50'}),
    }),
});

export const {
    useGetTopChartsQuery,
} = shazamApi
