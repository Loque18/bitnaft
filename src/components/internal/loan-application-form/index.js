/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';

import { open_modal } from 'src/redux/actions';

import useDebounce from 'src/hooks/useDebounce';

import api from 'src/api';

import formatNormalNumber from 'src/utils/fortmat-normal-number.js';
import formatBigNumber from 'src/utils/format-bignumber';

import modals from 'src/static/app.modals';

// const durations = [
//     { label: '1 Month', value: 1 },
//     { label: '3 Months', value: 3 },
//     { label: '6 Months', value: 6 },
//     { label: '1 Year', value: 12 },
//     { label: '2 Years', value: 24 },
// ];

const LoanApplicationForm = ({
    availableAssets,
    walletAssets,
    setHourlyInterest,
    setDailyInterest,
    setLiquidationPrice,
    setBorrowAsset,
    setCollateralAsset,
}) => {
    const dispatch = useDispatch();

    const defaultLoanToken = availableAssets.find(asset => asset.symbol === 'USDT');
    const defaultCollateralToken = walletAssets.find(asset => asset.symbol === 'BTC');

    const formik = useFormik({
        initialValues: {
            loanAmount: '',
            collateralAmount: '',
            // duration: '',
            loanAsset: defaultLoanToken,
            collateralAsset: defaultCollateralToken,
        },
        validationSchema: yup.object({
            loanAmount: yup.number().required('Loan amount is required'),
            loanAsset: yup.object(),
            collateralAmount: yup.number().required('Collateral amount is required'),
            collateralAsset: yup.object(),
            // duration: yup.number().required('Duration is required'),
        }),
        validateOnChange: true,
        onSubmit: values => {
            dispatch(
                open_modal({
                    modalName: modals.confirmLoanApplicationModal,
                    modalData: {
                        loanAmount: values.loanAmount,
                        loanAsset: values.loanAsset,
                        collateralAmount: values.collateralAmount,
                        collateralAsset: values.collateralAsset,
                    },
                })
            );
        },
    });

    // const onDurationChange = e => {
    //     setSelectedDuration(e.value);
    // };

    // create a debounce function for the loan amount input.

    const handleOpenAvailableAssetsForLoan = () => {
        dispatch(
            open_modal({
                modalName: modals.coinManagerModal,
                modalData: {
                    availableAssets,
                    disableAssets: [formik.values.loanAsset],
                },
            })
        );
    };

    const handleOpenAvailableAssetsForCollateral = () => {
        dispatch(
            open_modal({
                modalName: modals.coinManagerModal,
                modalData: {
                    availableAssets: walletAssets.filter(asset => asset.usdValue > 0),
                    disableAssets: [
                        formik.values.collateralAsset,
                        walletAssets.find(asset => asset.symbol === formik.values.loanAsset.symbol),
                    ],
                    onSelect: asset => {
                        formik.setFieldValue('collateralAsset', asset);
                        setCollateralAsset(asset);
                    },
                },
            })
        );
    };

    const debouncedLoanAmount = useDebounce(formik.values.loanAmount, 1000);

    const reqLiquidationPrice = async () => {
        try {
            const res = await api.get.liquidationPrice({
                collateral: formik.values.collateralAsset.name,
                borrow: formik.values.loanAsset.name,
            });

            const { liquidationPrice } = res.data.data;

            setLiquidationPrice(liquidationPrice);
        } catch (err) {
            setLiquidationPrice(0);
        }
    };

    const reqInterest = async () => {
        try {
            const res = await api.get.interestRate({ crypto: formik.values.loanAsset.name });
            const { hourlyInterest: hi, yearlyInterest: yi } = res.data.data;
            setHourlyInterest(hi);
            setDailyInterest(yi);
        } catch (err) {
            setHourlyInterest(0);
            setDailyInterest(0);
        }
    };

    const reqCollateralNeeded = async (borrowName, borrowAmount, collateralName) => {
        const params = `?borrowName=${borrowName}&borrowAmount=${borrowAmount}&collateralName=${collateralName}`;

        const res = await axios({
            method: 'GET',
            url: `api/loans/collateral-needed${params}`,
        });

        if (res.data.status === 'success') {
            const amountFormatted = formatBigNumber(res.data.data.amount, formik.values.collateralAsset.decimals);
            formik.setFieldValue('collateralAmount', amountFormatted);
        }
    };

    useEffect(() => {
        if (debouncedLoanAmount) {
            const borrowName = formik.values.loanAsset.name;
            const borrowAmount = formatNormalNumber(debouncedLoanAmount, formik.values.loanAsset.decimals);
            const collateralName = formik.values.collateralAsset.name;

            reqCollateralNeeded(borrowName, borrowAmount, collateralName);

            reqInterest();
            reqLiquidationPrice();
        } else {
            setHourlyInterest(0);
            setDailyInterest(0);
            setLiquidationPrice(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedLoanAmount]);

    useEffect(() => {
        setBorrowAsset(formik.values.loanAsset);
        setCollateralAsset(formik.values.collateralAsset);

        if (formik.values.loanAmount) {
            const borrowName = formik.values.loanAsset.name;
            const borrowAmount = formatNormalNumber(formik.values.loanAmount, formik.values.loanAsset.decimals);
            const collateralName = formik.values.collateralAsset.name;

            reqCollateralNeeded(borrowName, borrowAmount, collateralName);
            reqInterest();
            reqLiquidationPrice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.loanAsset, formik.values.collateralAsset]);

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label className="has-font-roboto has-text-hdarkgray" htmlFor="minmaxfraction">
                            Loan amount
                        </label>
                        <div className="control ">
                            <div className="p-inputgroup pt-2">
                                <InputNumber
                                    inputId="minmaxfraction"
                                    value={formik.values.loanAmount}
                                    name="loanAmount"
                                    // onValueChange={e => formik.handleChange(e)}
                                    onChange={e => formik.setFieldValue('loanAmount', e.value)}
                                    minFractionDigits={0}
                                    maxFractionDigits={18}
                                    placeholder="Enter loan amount"
                                    allowEmpty
                                />
                                <button
                                    type="button"
                                    className="has-bg-md-ref-neutral-99 is-clickable p-inputgroup-addon"
                                    onClick={handleOpenAvailableAssetsForLoan}
                                >
                                    <div className="columns is-gapless is-mobile">
                                        <div className="column is-flex is-narrow">
                                            <figure className="image is-24x24 has-margin-right-0 has-margin-left-0">
                                                <Image
                                                    src={formik.values.loanAsset.icon}
                                                    alt="Bitcoin"
                                                    layout="fill"
                                                    className="is-rounded"
                                                />
                                            </figure>
                                        </div>
                                        <div className="column is-flex is-align-items-center is-narrow ml-2">
                                            <p className="is-size-5 has-text-md-black has-font-roboto">
                                                {formik.values.loanAsset.symbol}
                                            </p>
                                        </div>
                                        <div className="column is-flex is-align-items-center is-narrow">
                                            <span className="icon has-text-md-black">
                                                <i className="fas fa-caret-down" />
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <p className="help is-danger">{formik.errors.loanAmount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <div className="field">
                        <div className="is-flex is-justify-content-space-between">
                            <label className="has-font-roboto has-text-hdarkgray" htmlFor="minmaxfraction">
                                Collateral amount
                            </label>
                            <div className="">
                                Balance:{' '}
                                {formik.values.collateralAsset &&
                                    formatBigNumber(
                                        formik.values.collateralAsset.balance,
                                        formik.values.collateralAsset.decimals
                                    )}
                            </div>
                        </div>
                        <div className="control ">
                            <div className="p-inputgroup pt-2">
                                <InputNumber
                                    inputId="minmaxfraction"
                                    value={formik.values.collateralAmount}
                                    name="collateralAmount"
                                    onValueChange={e => formik.handleChange(e)}
                                    minFractionDigits={0}
                                    maxFractionDigits={18}
                                    placeholder="Enter collateral amount"
                                    readOnly
                                    allowEmpty
                                    required
                                />
                                <button
                                    type="button"
                                    className="has-bg-md-ref-neutral-99 is-clickable p-inputgroup-addon"
                                    onClick={handleOpenAvailableAssetsForCollateral}
                                >
                                    <div className="columns is-gapless is-mobile">
                                        <div className="column is-flex is-narrow">
                                            <figure className="image is-24x24 has-margin-right-0 has-margin-left-0">
                                                <Image
                                                    src={formik.values.collateralAsset.icon}
                                                    alt={formik.values.collateralAsset.name}
                                                    layout="fill"
                                                    className="is-rounded"
                                                />
                                            </figure>
                                        </div>
                                        <div className="column is-flex is-align-items-center is-narrow ml-2">
                                            <p className="is-size-5 has-text-md-black has-font-roboto">
                                                {formik.values.collateralAsset.symbol}
                                            </p>
                                        </div>
                                        <div className="column is-flex is-align-items-center is-narrow">
                                            <span className="icon has-text-md-black">
                                                <i className="fas fa-caret-down" />
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <p className="help is-danger">
                                {formik.values.collateralAmount >
                                formatBigNumber(
                                    formik.values.collateralAsset.balance,
                                    formik.values.collateralAsset.decimals
                                )
                                    ? 'Collateral amount is greater than available balance'
                                    : formik.errors.collateralAmount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="columns">
                <div className="column">
                    <label className="label has-font-roboto has-text-weight-medium">Loan duration</label>
                    <Dropdown
                        value={selectedDuration}
                        options={durations}
                        onChange={onDurationChange}
                        placeholder="Select loan duration"
                        optionLabel="label"
                        style={{ width: '100%' }}
                    />
                </div>
            </div> */}
            <div className="columns">
                <div className="column is-4">
                    <button
                        className="button is-medium has-font-roboto has-bg-hperiwinkle has-text-md-key-colors-primary has-text-weight-medium is-fullwidth"
                        type="submit"
                        disabled={
                            Object.keys(formik.errors).length ||
                            formik.values.collateralAmount >
                                formatBigNumber(
                                    formik.values.collateralAsset.balance,
                                    formik.values.collateralAsset.decimals
                                )
                        }
                    >
                        Continue
                    </button>
                </div>
            </div>
        </form>
    );
};

export default LoanApplicationForm;
