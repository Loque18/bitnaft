/* eslint-disable jsx-a11y/label-has-associated-control */
import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import { InputNumber } from 'primereact/inputnumber';

import { Button } from 'primereact/button';

import formatDate from 'src/utils/format-date';

import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { start_close_modal } from 'src/redux/actions';

const RepayLoanModal = () => {
    const dispatch = useDispatch();
    const { repayLoanModal } = useSelector(state => state.modalReducer);

    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        dispatch(start_close_modal());
    };

    return (
        <Modal isOpen={repayLoanModal.isOpen}>
            <div className="resize-manager">
                <div className={`box has-bg-md-white `} style={{ padding: '3px' }}>
                    <div className="box has-bg-md-white ">
                        <CardLayout
                            header={
                                <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                    <h1 className="subtitle is-size-5 has-text-md-black has-font-roboto has-text-weight-medium is-flex-grow-a">
                                        Repay Loan
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
                            content={
                                <div className="py-5">
                                    <div className="media is-flex is-align-items-center">
                                        <div className="media-left mr-5 is-relative">
                                            <figure className="image is-24x24">
                                                <Image
                                                    className="is-rounded shadowed-logo"
                                                    src="https://bitcoin.org/img/icons/opengraph.png?1657703267"
                                                    layout="fill"
                                                    alt=""
                                                />
                                            </figure>
                                            <figure
                                                className="image is-24x24"
                                                style={{ position: 'absolute', top: '50%', left: '50%' }}
                                            >
                                                <Image
                                                    className="is-rounded shadowed-logo"
                                                    src="https://bitcoin.org/img/icons/opengraph.png?1657703267"
                                                    layout="fill"
                                                    alt=""
                                                />
                                            </figure>
                                        </div>
                                        <div className="media-content is-clipped">
                                            <div className="columns is-mobile">
                                                <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                                    <p className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                                        Bitcoin / Bitcoin
                                                    </p>
                                                </div>
                                                <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                                    <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-roboto">
                                                        BTC / BTC
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="columns mb-0 pt-5 is-mobile">
                                        <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                            <h1 className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                                Borrowed amount
                                            </h1>
                                        </div>
                                        <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                            <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-pt-mono">
                                                0.0 <span className="has-font-roboto">BTC</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="columns mb-0 is-mobile">
                                        <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                            <h1 className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                                Collateral Amount
                                            </h1>
                                        </div>
                                        <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                            <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-pt-mono">
                                                0.0 <span className="has-font-roboto">BTC</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="columns mb-0 is-mobile">
                                        <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                            <h1 className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                                Borrowed Date
                                            </h1>
                                        </div>
                                        <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                            <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-pt-mono">
                                                {formatDate(1653529592)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="columns mb-0 is-mobile">
                                        <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                            <h1 className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                                Returning Date
                                            </h1>
                                        </div>
                                        <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                            <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-pt-mono">
                                                {formatDate(1653729592)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="columns mb-0 is-mobile">
                                        <div className="column">
                                            <div className="field">
                                                <label
                                                    className="has-font-roboto has-text-md-black"
                                                    htmlFor="minmaxfraction"
                                                >
                                                    Amount
                                                </label>
                                                <div className="control ">
                                                    <div className="p-inputgroup pt-2">
                                                        <InputNumber
                                                            inputId="minmaxfraction"
                                                            name="Amount"
                                                            minFractionDigits={0}
                                                            maxFractionDigits={18}
                                                            placeholder="Amount"
                                                            allowEmpty
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            footer={
                                <section className="has-text-centered ">
                                    <div className="buttons is-flex is-justify-content-center ">
                                        <button className="button is-hblue outlined" type="button">
                                            Cancel
                                        </button>
                                        <button
                                            className={`button is-hblue ${loading ? 'is-loading' : ''}`}
                                            type="button"
                                        >
                                            Repay
                                        </button>
                                    </div>
                                </section>
                            }
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default RepayLoanModal;
