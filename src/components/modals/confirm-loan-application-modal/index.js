/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import { open_modal, start_close_modal } from 'src/redux/actions';

import modals from 'src/static/app.modals';

import formatNormalNumber from 'src/utils/fortmat-normal-number.js';

const ConfirmLoanApplicationModal = () => {
    const dispatch = useDispatch();
    const confirmLoanApplicationModal = useSelector(state => state.modalReducer[modals.confirmLoanApplicationModal]);

    const { data } = confirmLoanApplicationModal;

    const [loading, setLoading] = useState(false);

    const handleCloseClick = () => {
        dispatch(start_close_modal(modals.confirmLoanApplicationModal));
    };

    const handleConfirmClick = async () => {
        setLoading(true);
        try {
            const dataa = {
                collateralName: data.collateralAsset.name,
                collateralAmount: formatNormalNumber(data.collateralAmount, data.collateralAsset.decimals),
                borrowName: data.loanAsset.name,
                borrowAmount: formatNormalNumber(data.loanAmount, data.loanAsset.decimals),
            };

            const res = await axios({
                method: 'post',
                url: '/api/loans/application',
                data: dataa,
            });
            if (res.data.status === 'success') {
                dispatch(
                    open_modal({
                        modalName: modals.LoanGivenSuccessfullyModal,
                        modalData: {
                            borrowAmount: data.loanAmount,
                            collateralAmount: data.collateralAmount,
                            borrowAsset: data.loanAsset,
                            collateralAsset: data.collateralAsset,
                        },
                    })
                );
            }
            if (res.data.status === 'fail') {
                toast.error(res.data.data.message);
            }
        } catch (err) {
            toast.error('Something went wrong, try again later');
        }
        setLoading(false);
    };

    return (
        <Modal isOpen={confirmLoanApplicationModal.isOpen}>
            <div className="resize-manager">
                <div className="box has-bg-md-white ">
                    <CardLayout
                        header={
                            <div className="is-flex is-justify-content-center">
                                {/* <figure className="image is-64x64">
                                    <Image src="/media/icons/checked.png" alt="" layout="fill" />
                                </figure> */}
                                {/* <button
                                    className="has-text-md-black is-flex unstyled-button"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    <i className="fas fa-times" />
                                </button> */}
                                <h1 className="title is-size-5 has-text-centered">Confirm Loan Application</h1>
                            </div>
                        }
                        content={
                            <div>
                                <section className="py-5">
                                    <div className="is-flex is-justify-content-space-between">
                                        <h1 className="title is-size-6">Loan amount</h1>
                                        <h1 className=" is-size-6 has-text-right">
                                            {data && data.loanAmount} {data && data.loanAsset && data.loanAsset.symbol}
                                        </h1>
                                    </div>
                                    <div className="is-flex is-justify-content-space-between">
                                        <h1 className="title is-size-6">Collateral</h1>
                                        <h1 className=" is-size-6 has-text-right">
                                            {' '}
                                            {data && data.collateralAmount}{' '}
                                            {data && data.collateralAsset && data.collateralAsset.symbol}
                                        </h1>
                                    </div>
                                </section>
                                <section className="has-text-centered ">
                                    <div className="buttons is-flex is-justify-content-center ">
                                        <button
                                            className="button is-hblue outlined"
                                            onClick={handleCloseClick}
                                            type="button"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className={`button is-hblue ${loading ? 'is-loading' : ''}`}
                                            onClick={handleConfirmClick}
                                            type="button"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </section>
                            </div>
                        }
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmLoanApplicationModal;
