/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import { open_modal, start_close_modal } from 'src/redux/actions';

import formatBigNumber from 'src/utils/format-bignumber';
import formatNormalNumber from 'src/utils/fortmat-normal-number.js';

import modals from 'src/static/app.modals';
import axios from 'axios';
import { toast } from 'react-toastify';

const SubscribeToSavingOffer = () => {
    const dispatch = useDispatch();
    const subscribeToSavingOfferModal = useSelector(state => state.modalReducer[modals.subscribeToSavingOfferModal]);

    const { asset, balance } = subscribeToSavingOfferModal.data;

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            amount: '',
        },
        validationSchema: yup.object({
            amount: yup
                .number()
                .min(0.1, `minimum amount is 0.1`)
                .max((asset && formatBigNumber(balance, asset.decimals)) || 0)
                .required('please enter amount'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const { amount } = values;

            const amountBN = formatNormalNumber(amount, asset.decimals);

            setLoading(true);

            try {
                const res = await axios({
                    method: 'POST',
                    url: '/api/savings/subscribe',
                    data: {
                        cryptoName: asset.name,
                        amount: amountBN,
                    },
                });

                if (!res.data.status === 'success') {
                    throw new Error(res.data.message);
                }

                dispatch(
                    open_modal({
                        modalName: modals.subscribedSuccesfullyModal,
                        modalData: { amount, asset: { symbol: asset.symbol } },
                    })
                );

                resetForm();
            } catch (err) {
                toast.error(err.message);
            }

            setLoading(false);
        },
    });

    const closeModal = () => {
        dispatch(start_close_modal());
        formik.resetForm();
    };

    return (
        <Modal
            isOpen={subscribeToSavingOfferModal.isOpen}
            onCloseCallback={() => {
                formik.resetForm();
            }}
        >
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
                        content={
                            <div>
                                <section className="is-flex is-flex-direction-row is-align-items-center mb-5">
                                    {asset && asset.icon ? (
                                        <figure className="image is-32x32 mr-3">
                                            <Image className="is-rounded" src={asset.icon} layout="fill" alt="" />
                                        </figure>
                                    ) : null}
                                    <h1 className="title is-size-5 has-text-md-black has-font-roboto has-text-weight-medium">
                                        {asset && asset.symbol}
                                    </h1>
                                </section>

                                <section>
                                    <div className="is-flex is-justify-content-space-between">
                                        <h1 className="title is-size-6">Duration</h1>
                                        <h1 className=" is-size-6 has-text-right">Flexible</h1>
                                    </div>
                                    <div className="is-flex is-justify-content-space-between">
                                        <h1 className="title is-size-6">Minimun</h1>
                                        <h1 className="is-size-6 has-text-right">
                                            {asset && formatBigNumber(asset.minimumAmount, asset.decimals)}{' '}
                                            {asset && asset.symbol}
                                        </h1>
                                    </div>
                                    <div className="is-flex is-justify-content-space-between">
                                        <h1 className="title is-size-6">APR</h1>
                                        <h1 className="is-size-6 has-text-right">{asset && asset.apr} %</h1>
                                    </div>
                                </section>
                                <section className="">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="field">
                                            <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                                <label className="label is-size-7">Amount</label>
                                                <div className="is-size-7">
                                                    Asset balance: {asset && formatBigNumber(balance, asset.decimals)}
                                                </div>
                                            </div>
                                            <div className="control has-icons-right">
                                                <input
                                                    className={`input arrowless${
                                                        formik.touched.amount && formik.errors.amount ? 'is-danger' : ''
                                                    } `}
                                                    type="number"
                                                    placeholder="Amount"
                                                    value={formik.values.amount}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name="amount"
                                                />

                                                <p className="help is-flex is-flex-direction-row is-justify-content-space-between">
                                                    {formik.touched.amount && formik.errors.amount ? (
                                                        <span className="has-text-danger">{formik.errors.amount}</span>
                                                    ) : (
                                                        '⠀'
                                                    )}
                                                </p>

                                                {/* <button
                                                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                                                    className={`unstyled-button ${eye_button}`}
                                                    type="button"
                                                    onClick={changePasswordVisibility}
                                                    style={{ zIndex: '5' }}
                                                    tabIndex="-1"
                                                >
                                                    <span className="icon is-small">
                                                        {passwordVisible ? <EyeSlash /> : <Eye />}
                                                    </span>
                                                </button> */}
                                            </div>
                                        </div>

                                        <div className="field">
                                            <div className="control">
                                                <button
                                                    aria-label="Log in"
                                                    className={`button is-hblue is-fullwidth ${
                                                        loading ? 'is-loading' : ''
                                                    }`}
                                                    type="submit"
                                                    disabled={Object.keys(formik.errors).length > 0}
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        }
                    />
                </div>
            </div>
        </Modal>
    );
};

export default SubscribeToSavingOffer;
