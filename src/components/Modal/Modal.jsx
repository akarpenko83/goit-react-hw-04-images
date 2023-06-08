import { ModalContent, Overlay } from './Modal.styled';
import { useEffect } from 'react';

const Modal = ({ picSrc, closeModal }) => {
    const handleBackdropClick = evt => {
        if (evt.target === evt.currentTarget) {
            closeModal();
        }
    };
    useEffect(() => {
        const handleEscKey = evt => {
            if (evt.code === 'Escape') {
                console.log('ESC');
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener(
                'keydown',
                handleEscKey,
            );
            document.body.style.overflow = 'visible';
        };
    }, [closeModal, picSrc]);

    return (
        <Overlay onClick={handleBackdropClick}>
            <ModalContent>
                <img src={picSrc} alt="cat" />
            </ModalContent>
        </Overlay>
    );
};

export default Modal;
