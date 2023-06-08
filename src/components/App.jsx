import React from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Modal from './Modal';
import Searchbar from './Searchbar/Searchbar';
import fetchPhotos from 'services/pixabayApi';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './Button/LoadMoreBtn';
import { useState, useEffect } from 'react';

// const pixabayApi = new PixabayApi();

const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};
const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState(null);
    const [pixabay, setPixabay] = useState([]);
    const [picLink, setPicLink] = useState(null);
    const [page, setPage] = useState(1);
    const [per_page, setPerPage] = useState(12);

    const [totalHits, setTotalHits] = useState(0);
    const [status, setStatus] = useState(STATUS.IDLE);

    const onSubmit = queryResult => {
        setSearchQuery(queryResult);
        setPixabay([]);
        setPicLink(null);
        setPage(1);
        setPerPage(12);
        setTotalHits(0);
        setStatus(STATUS.IDLE);
    };

    useEffect(() => {
        if (!searchQuery) {
            return;
        } else {
            Loading.arrows();

            fetchPhotos(searchQuery, page, per_page)
                .then(response => {
                    if (!response) {
                        throw new Error();
                    }
                    setPixabay(pixabay => [
                        ...pixabay,
                        ...response.hits,
                    ]);
                    setTotalHits(response.totalHits);
                    setStatus(STATUS.RESOLVED);
                    // console.log(response.hits);
                    // console.log(pixabay);
                    // console.log(
                    //     'response from API: ',
                    //     response,
                    // );
                })
                .catch(error => {
                    console.log(error);
                    setPixabay([]);
                    setPage(1);
                    setSearchQuery('');
                    setShowModal(true);
                    setPicLink(
                        'https://www.cloudways.com/blog/wp-content/uploads/wordpress-404-error.jpg',
                    );
                    setStatus(STATUS.REJECTED);
                })
                .finally(Loading.remove());
        }
    }, [page, per_page, searchQuery]);

    const onPictureClick = picture => {
        setPicLink(picture);

        setShowModal(true);
    };
    const modalClose = () => {
        setShowModal(false);
    };
    const onLoadMore = () => {
        console.log(page);
        console.log(pixabay);
        console.log(searchQuery);
        setPage(prevPage => prevPage + 1);
    };

    const getEndOfQuery = () => {
        const totalPages = Math.ceil(totalHits / per_page);
        console.log(page, ' of pages ', totalPages);
        if (totalPages !== page) {
            return true;
        }
        return false;
    };

    return (
        <>
            <Searchbar onSubmit={onSubmit} />
            {showModal && (
                <Modal
                    closeModal={modalClose}
                    picSrc={picLink}
                />
            )}

            <ImageGallery
                pictures={pixabay}
                onPictureClick={onPictureClick}
            />

            {status === STATUS.RESOLVED &&
                getEndOfQuery() && (
                    <LoadMoreBtn onLoadMore={onLoadMore} />
                )}
            {status === STATUS.REJECTED && showModal && (
                <Modal
                    closeModal={modalClose}
                    picSrc={picLink}
                />
            )}
        </>
    );
};

export default App;
