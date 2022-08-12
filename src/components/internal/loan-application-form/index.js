/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import LoanApplicationInputForm from './loan-application-input-form';

const LoanApplicationForm = props => {
    const [loanAmount, setLoanAmount] = useState(null);
    const [collateralAmount, setCollateralAmount] = useState(null);

    const [selectedDuration, setSelectedDuration] = useState(null);

    const durations = [
        { label: '1 Month', value: 1 },
        { label: '3 Months', value: 3 },
        { label: '6 Months', value: 6 },
        { label: '1 Year', value: 12 },
        { label: '2 Years', value: 24 },
    ];

    const onDurationChange = e => {
        setSelectedDuration(e.value);
    };

    return (
        <form className="form">
            <div className="box">
                <div className="columns">
                    <div className="column is-6">
                        <div className="columns">
                            <div className="column">
                                <LoanApplicationInputForm
                                    value={loanAmount}
                                    setValue={setLoanAmount}
                                    label="Loan Amount"
                                    placeholder="Amount"
                                />
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <LoanApplicationInputForm
                                    value={collateralAmount}
                                    setValue={setCollateralAmount}
                                    label="Collateral Amount"
                                />
                            </div>
                        </div>
                        <div className="columns">
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
                        </div>
                        <div className="columns">
                            <div className="column is-4">
                                <button
                                    className="button is-medium has-font-roboto has-bg-hperiwinkle has-text-md-key-colors-primary has-text-weight-medium is-fullwidth"
                                    type="button"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="column is-1" />
                    <div className="column is-5">
                        <div className="columns">
                            <div className="column">
                                <h1 className="is-size-4 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                    Loan to value ratio (LVT)
                                </h1>
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <p className="is-size-4 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                            0%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns mt-5">
                            <div className="column">
                                <h1 className="is-size-5 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                    Liquidation price
                                </h1>
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <p className="is-size-5 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                            -
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <h1 className="is-size-5 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                    Interest rate
                                </h1>
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <p className="is-size-5 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                            -
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns mt-5">
                            <div className="column">
                                <h1 className="is-size-5 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                    Total interest amount
                                </h1>
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <p className="is-size-5 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                            -
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <h1 className="is-size-5 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                    Repayment amount
                                </h1>
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <p className="is-size-5 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                            -
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoanApplicationForm;
