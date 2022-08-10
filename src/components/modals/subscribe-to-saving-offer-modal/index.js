import Image from 'next/image';
import { useState, useEffect } from 'react';
import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

import { start_close_modal } from 'src/redux/actions';

import modals from 'src/static/app.modals';

const SubscribeToSavingOffer = () => {
    const dispatch = useDispatch();
    const subscribeToSavingOfferModal = useSelector(state => state.modalReducer[modals.subscribeToSavingOfferModal]);

    console.log('subscribeToSavingOfferModal', subscribeToSavingOfferModal);

    const { asset } = subscribeToSavingOfferModal.data;

    const closeModal = () => {
        dispatch(start_close_modal());
    };

    return (
        <Modal isOpen={subscribeToSavingOfferModal.isOpen}>
            <div className="resize-manager">
                <div className="box has-bg-md-white ">
                    <CardLayout
                        header={
                            <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                <h1 className="subtitle is-size-5 has-text-md-black has-font-roboto has-text-weight-medium is-flex-grow-a">
                                    Subscribe {asset && asset.symbol}
                                </h1>
                                <button
                                    className="has-text-md-black is-flex unstyled-button"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        }
                        content={<div></div>}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default SubscribeToSavingOffer;
