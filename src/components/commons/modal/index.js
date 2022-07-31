/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { start_close_modal, close_modal } from 'src/redux/actions';

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise(resolve => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        if (node === null) return;

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

const Modal = props => {
    // props
    const { children, isOpen, closeBtn, onCloseCallback } = props;

    // reducer
    const { currentModal, animation } = useSelector(state => state.modalReducer);

    const dispatch = useDispatch();

    const closeAfterAnimation = async () => {
        await animateCSS('#____modal', 'fadeOut');
        dispatch(close_modal());
    };

    const handleClick = () => {
        dispatch(start_close_modal());
        if (onCloseCallback) onCloseCallback();
    };

    // close modal on esc key press
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        // lock page scroll
        document.body.style.overflow = 'hidden';

        const handleKeyDown = e => {
            if (e.key === 'Escape') {
                dispatch(start_close_modal());
                if (onCloseCallback) onCloseCallback();
            }
        };
        // const elmnt = document.querySelector('#____modal-bg');
        window.addEventListener('keydown', handleKeyDown);
        // elmnt.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // elmnt.removeEventListener('click', handleClick);

            // unlock page scroll
            document.body.style.overflow = 'visible';
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        if (animation === 'close') {
            if (currentModal === '') return;
            closeAfterAnimation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animation, currentModal]);

    return isOpen ? (
        <div className="modal is-active">
            <div
                id="____modal-bg"
                className="modal-background has-background-a-o-5 has-bg-blur-2"
                onClick={handleClick}
                role="button"
                aria-label="Close modal"
            />
            <div
                id="____modal"
                className="modal-content px-4 animate__faster animate__animated animate__fadeIn"
                style={{ display: 'grid', placeItems: 'center', animationDuration: '0.25s', height: '100%' }}
            >
                {children}
            </div>
            {closeBtn ? (
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={closeAfterAnimation}
                    type="button"
                />
            ) : null}
        </div>
    ) : null;
};

export default Modal;
