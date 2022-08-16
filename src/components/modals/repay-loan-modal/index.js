/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import { InputNumber } from 'primereact/inputnumber';

import formatDate from 'src/utils/format-date';

import Image from 'next/image';

import { start_close_modal } from 'src/redux/actions';

import modals from 'src/static/app.modals';

import formatBigNumber from 'src/utils/format-bignumber';
import axios from 'axios';
import formatNormalNumber from 'src/utils/fortmat-normal-number.js';

const RepayLoanModal = () => {
    const dispatch = useDispatch();
    const repayLoanModal = useSelector(state => state.modalReducer[modals.repayLoanModal]);

    const [loading, setLoading] = useState(false);

    const { data } = repayLoanModal;

    const formik = useFormik({
        initialValues: {
            amount: '',
        },
        validationSchema: yup.object({
            amount: yup.number().required('Amount is required'),
        }),
        onSubmit: async values => {
            setLoading(true);
            try {
                const response = await axios({
                    method: 'post',
                    url: `/api/loans/repay`,
                    data: {
                        loanHash: data.loan.loanHash,
                        amount: formatNormalNumber(values.amount, data.loan.borrowDecimals),
                    },
                });

                if (response.data.status === 'fail') {
                    setLoading(false);
                    toast.error(response.data.message);
                    return;
                }

                toast.success(response.data.data.message);
                dispatch(start_close_modal(modals.repayLoanModal));
            } catch (error) {
                toast.error('Something went wrong, please try again later');
            }

            setLoading(false);
        },
    });

    const handleSubmit = () => {
        // submitForm();
        formik.submitForm();
    };

    const closeModal = () => {
        dispatch(start_close_modal());
    };

    return (
        <Modal isOpen={repayLoanModal.isOpen}>
            <div className="resize-manager">
                <div className="box has-bg-md-white ">
                    <CardLayout
                        header={
                            <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                <h1 className="subtitle is-size-5 has-text-md-black has-font-roboto has-text-weight-medium is-flex-grow-a">
                                    Repay Loan
                                </h1>
                                {/* <button
                                    className="has-text-md-black is-flex unstyled-button"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    <i className="fas fa-times" />
                                </button> */}
                            </div>
                        }
                        content={
                            <div className="py-5">
                                <div className="media is-flex is-align-items-center">
                                    <div className="media-left mr-5 is-relative">
                                        <figure className="image is-24x24">
                                            <Image
                                                className="is-rounded shadowed-logo"
                                                src={data && data.loan && data.loan.borrowIcon}
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
                                                src={data && data.loan && data.loan.collateralIcon}
                                                layout="fill"
                                                alt=""
                                            />
                                        </figure>
                                    </div>
                                    <div className="media-content is-clipped">
                                        <div className="columns is-mobile">
                                            <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                                <p className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                                    {data && data.loan && data.loan.borrowName} /{' '}
                                                    {data && data.loan && data.loan.collateralName}
                                                </p>
                                            </div>
                                            <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                                <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-roboto">
                                                    {data && data.loan && data.loan.borrowSymbol} /{' '}
                                                    {data && data.loan && data.loan.collateralSymbol}
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
                                            {data &&
                                                data.loan &&
                                                formatBigNumber(data.loan.borrowAmount, data.loan.borrowDecimals)}{' '}
                                            <span className="has-font-roboto">
                                                {' '}
                                                {data && data.loan && data.loan.borrowSymbol}
                                            </span>
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
                                            {data &&
                                                data.loan &&
                                                formatBigNumber(
                                                    data.loan.collateralAmount,
                                                    data.loan.collateralDecimals
                                                )}{' '}
                                            <span className="has-font-roboto">
                                                {' '}
                                                {data && data.loan && data.loan.collateralSymbol}
                                            </span>
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
                                            {data && data.loan && formatDate(data.loan.borrowDate)}
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
                                            {data && data.loan && formatDate(data.loan.returningDate)}
                                        </p>
                                    </div>
                                </div>
                                <div className="columns mb-0 is-mobile">
                                    <div className="column">
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="field">
                                                <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                                    <label
                                                        className="has-font-roboto has-text-md-black"
                                                        htmlFor="minmaxfraction"
                                                    >
                                                        Amount
                                                    </label>
                                                    <div className="">
                                                        {data && data.loan && data.loan.borrowName} balance:{' '}
                                                        <span className="has-font-pt-mono">
                                                            {(() => {
                                                                if (data && data.loan && data.walletAssets) {
                                                                    const borrowAsset = data.walletAssets.find(
                                                                        asset => asset.name === data.loan.borrowName
                                                                    );

                                                                    const balance = formatBigNumber(
                                                                        borrowAsset.balance,
                                                                        borrowAsset.decimals
                                                                    );

                                                                    return balance;
                                                                }
                                                            })()}{' '}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="control ">
                                                    <div className="p-inputgroup pt-2">
                                                        <InputNumber
                                                            inputId="minmaxfraction"
                                                            name="amount"
                                                            minFractionDigits={0}
                                                            maxFractionDigits={18}
                                                            placeholder="Amount"
                                                            allowEmpty
                                                            value={formik.values.email}
                                                            onChange={e => formik.setFieldValue('amount', e.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                        footer={
                            <section className="has-text-centered ">
                                <div className="buttons is-flex is-justify-content-center ">
                                    <button className="button is-hblue outlined" type="button" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button
                                        className={`button is-hblue ${loading ? 'is-loading' : ''}`}
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Repay
                                    </button>
                                </div>
                            </section>
                        }
                    />
                </div>
            </div>
        </Modal>
    );
};
export default RepayLoanModal;
