import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default async function fetchPhotos(
    searchQuery,
    page,
) {
    const url = 'https://pixabay.com/api/';
    const axiosParams = {
        params: {
            key: '35064628-b4315bc92921e9ccef2ae28e5',
            q: encodeQuery(searchQuery),
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'false',
            page: page,
            per_page: 12,
        },
    };
    try {
        const response = await axios.get(url, axiosParams);
        // console.log(response.data);
        const totalPages = Math.ceil(
            response.data.totalHits /
                axiosParams.params.per_page,
        );

        if (response.data.hits.length === 0) {
            Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.',
            );
            throw new Error(response);
        }
        if (totalPages === page) {
            Notify.warning(
                "We're sorry, but you've reached the end of search results.",
            );
        }
        Notify.info(
            `Hooray! We found ${response.data.totalHits} images on ${totalPages} pages. Current page: ${page}`,
        );
        return response.data;
    } catch (error) {
        return;
    }
}

function encodeQuery(searchQuery) {
    return encodeURIComponent(searchQuery).replace(
        /%20/g,
        '+',
    );
}
