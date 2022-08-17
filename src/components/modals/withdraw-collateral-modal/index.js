/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { toast } from 'react-toastify';

import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import useDebounce from 'src/hooks/useDebounce';

import modals from 'src/static/app.modals';

import { start_close_modal } from 'src/redux/actions';
import formatBigNumber from 'src/utils/format-bignumber';
import formatNormalNumber from 'src/utils/fortmat-normal-number.js';

const Ltv = ({ amount, asset, loanHash }) => {
    const [loading, setLoading] = useState(false);
    const [ltv, setLtv] = useState(0);

    const debouncedLtv = useDebounce(amount, 1000);

    useEffect(() => {
        if (!debouncedLtv) {
            setLtv(0);
            return;
        }

        (async () => {
            setLoading(true);

            try {
                const res = await axios({
                    method: 'post',
                    url: '/api/loans/get-ltv-after',
                    data: {
                        amount: formatNormalNumber(debouncedLtv, asset.decimals),
                        loanHash,
                        type: 'ltvAfterWithdrawal',
                    },
                });

                if (res.data.status === 'fail') {
                    toast.error(res.data.message);
                    setLoading(false);
                    return;
                }
                setLtv(res.data.data.ltv);
            } catch (err) {
                toast.error('System was not able to determine LTV');
            }

            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedLtv]);

    return loading ? (
        <ProgressSpinner
            style={{ width: '20px', height: '20px' }}
            strokeWidth="4"
            fill="var(--surface-ground)"
            animationDuration=".5s"
        />
    ) : (
        <span>{ltv}</span>
    );
};

const WithdrawCollateralModal = () => {
    const dispatch = useDispatch();
    const withdrawCollateralModal = useSelector(state => state.modalReducer[modals.withdrawCollateralModal]);

    const [loading, setLoading] = useState(false);

    const { data } = withdrawCollateralModal;

    const formik = useFormik({
        initialValues: {
            amount: '',
        },
        validationSchema: yup.object().shape({
            amount: yup.number().required('Amount is required'),
        }),

        onSubmit: async values => {
            setLoading(true);
            try {
                const response = await axios({
                    method: 'post',
                    url: `/api/loans/withdraw-collateral`,
                    data: {
                        loanHash: data.loan.loanHash,
                        amount: formatNormalNumber(values.amount, data.loan.collateralDecimals),
                    },
                });

                if (response.data.status === 'fail') {
                    toast.error(response.data.data.message);
                    setLoading(false);
                    return;
                }

                toast.success(response.data.data.message);

                dispatch(start_close_modal(modals.repayLoanModal));
            } catch (error) {
                toast.error('Something went wrong');
            }
            setLoading(false);
        },
    });

    const handleSubmit = () => {
        formik.submitForm();
    };

    const closeModal = () => {
        dispatch(start_close_modal());
    };

    useEffect(() => {
        if (!data || !data.loan) return;

        (async () => {})();
    }, [data]);

    if (!data || !data.loan) return null;

    return (
        <Modal isOpen={withdrawCollateralModal.isOpen}>
            <div className="resize-manager">
                <div className={`box has-bg-md-white `} style={{ pwithdrawing: '3px' }}>
                    <CardLayout
                        header={
                            <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                <h1 className="subtitle is-size-5 has-text-md-black has-font-roboto has-text-weight-medium is-flex-grow-a">
                                    Withdraw Collateral
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
                                                src={data.loan.borrowIcon}
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
                                                src={data.loan.collateralIcon}
                                                layout="fill"
                                                alt=""
                                            />
                                        </figure>
                                    </div>
                                    <div className="media-content is-clipped">
                                        <div className="columns is-mobile">
                                            <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                                <p className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                                    {data.loan.borrowName} / {data.loan.collateralName}
                                                </p>
                                            </div>
                                            <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                                <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-roboto">
                                                    {data.loan.borrowSymbol} / {data.loan.collateralSymbol}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns mb-0 pt-5 is-mobile">
                                    <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                        <h1 className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                            TVL
                                        </h1>
                                    </div>
                                    <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                        <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-pt-mono">
                                            0 %
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
                                            {formatBigNumber(data.loan.collateralAmount, data.loan.collateralDecimals)}{' '}
                                            <span className="has-font-roboto">{data.loan.collateralSymbol}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="columns mb-0 is-mobile">
                                    <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                        <h1 className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                            Ltv after withdrawal
                                        </h1>
                                    </div>
                                    <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                        <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-pt-mono">
                                            <Ltv
                                                amount={formik.values.amount}
                                                asset={{
                                                    decimals: data.loan.borrowDecimals,
                                                }}
                                                loanHash={data.loan.loanHash}
                                            />
                                        </p>
                                    </div>
                                </div>

                                <div className="columns mb-0 is-mobile">
                                    <div className="column">
                                        <form onSubmit={handleSubmit}>
                                            <div className="field">
                                                <label
                                                    className="label has-font-roboto has-text-md-black"
                                                    htmlFor="minmaxfraction"
                                                >
                                                    Amount
                                                </label>
                                                <div className="control ">
                                                    <div className="p-inputgroup pt-2">
                                                        <InputNumber
                                                            inputId="minmaxfraction"
                                                            name="amount"
                                                            minFractionDigits={0}
                                                            maxFractionDigits={18}
                                                            placeholder="Amount"
                                                            allowEmpty
                                                            value={formik.values.amount}
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
                                        Confirm
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
export default WithdrawCollateralModal;
