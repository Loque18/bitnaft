/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import useDebounce from 'src/hooks/useDebounce';

import { InputNumber } from 'primereact/inputnumber';

import formatDate from 'src/utils/format-date';
import formatBigNumber from 'src/utils/format-bignumber';
import formatNormalNumber from 'src/utils/fortmat-normal-number.js';

import modals from 'src/static/app.modals';

import { start_close_modal } from 'src/redux/actions';
import formatNumber from 'src/utils/format-number';

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
                        type: 'ltvAfterAddingCollateral',
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

const AddCollateralModal = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const addCollateralModal = useSelector(state => state.modalReducer[modals.addCollateralModal]);

    const { data } = addCollateralModal;

    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);

    const formik = useFormik({
        initialValues: {
            collateralAmount: '',
        },
        validationSchema: Yup.object({
            collateralAmount: Yup.number().max(balance, 'Insufficient balance').required('Required'),
        }),

        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const response = await axios({
                    method: 'post',
                    url: `/api/loans/add-collateral`,
                    data: {
                        loanHash: data.loan.loanHash,
                        amount: formatNormalNumber(values.collateralAmount, data.loan.collateralDecimals),
                    },
                });

                if (response.data.status === 'fail') {
                    setLoading(false);
                    toast.error(response.data.data.message);
                    return;
                }

                toast.success(response.data.data.message);
                router.replace(router.asPath);
                dispatch(start_close_modal(modals.repayLoanModal));
                resetForm();
            } catch (error) {
                toast.error('Something went wrong');
            }

            setLoading(false);
        },
    });

    const handleSubmit = () => {
        formik.handleSubmit();
    };

    const closeModal = () => {
        dispatch(start_close_modal());
    };

    useEffect(() => {
        if (!data || !data.loan || !data.walletAssets) return;

        const collateralAsset = data.walletAssets.find(asset => asset.name === data.loan.collateralName);

        const baalance = formatNumber(formatBigNumber(collateralAsset.balance, collateralAsset.decimals));

        setBalance(baalance);
    }, [data]);

    if (!data || !data.loan) return null;

    return (
        <Modal isOpen={addCollateralModal.isOpen}>
            <div className="resize-manager">
                <div className="box has-bg-md-white ">
                    <CardLayout
                        header={
                            <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                <h1 className="subtitle is-size-5 has-text-md-black has-font-roboto has-text-weight-medium is-flex-grow-a">
                                    Add Collateral
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
                                            Borrowed amount
                                        </h1>
                                    </div>
                                    <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                        <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-pt-mono">
                                            {formatNumber(
                                                formatBigNumber(data.loan.borrowAmount, data.loan.borrowDecimals)
                                            )}{' '}
                                            <span className="has-font-roboto">{data.loan.borrowSymbol}</span>
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
                                            {formatNumber(
                                                formatBigNumber(
                                                    data.loan.collateralAmount,
                                                    data.loan.collateralDecimals
                                                )
                                            )}{' '}
                                            <span className="has-font-roboto">{data.loan.collateralSymbol}</span>
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
                                            {formatDate(data.loan.borrowDate)}
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
                                            {formatDate(data.loan.returningDate)}
                                        </p>
                                    </div>
                                </div>
                                <div className="columns mb-0 is-mobile">
                                    <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                                        <h1 className="title has-font-roboto has-text-md-black is-size-6 has-text-weight-medium">
                                            Ltv after repay
                                        </h1>
                                    </div>
                                    <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                                        <div className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-pt-mono">
                                            <Ltv
                                                amount={formik.values.collateralAmount}
                                                asset={{
                                                    decimals: data.loan.collateralDecimals,
                                                }}
                                                loanHash={data.loan.loanHash}
                                            />
                                        </div>
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
                                                        {data.loan.collateralSymbol} balance:{' '}
                                                        <span className="has-font-pt-mono">{balance}</span>
                                                    </div>
                                                </div>

                                                <div className="control ">
                                                    <div className="p-inputgroup pt-2">
                                                        <InputNumber
                                                            inputId="minmaxfraction"
                                                            name="collateralAmount"
                                                            minFractionDigits={0}
                                                            maxFractionDigits={18}
                                                            placeholder="Amount"
                                                            allowEmpty
                                                            value={formik.values.email}
                                                            onChange={e =>
                                                                formik.setFieldValue('collateralAmount', e.value)
                                                            }
                                                        />
                                                    </div>

                                                    {formik.errors.collateralAmount ? (
                                                        <div className="p-inputgroup pt-2">
                                                            <span className="has-text-danger">
                                                                {formik.errors.collateralAmount}
                                                            </span>
                                                        </div>
                                                    ) : null}
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
                                        disabled={Object.keys(formik.errors).length > 0}
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
export default AddCollateralModal;
