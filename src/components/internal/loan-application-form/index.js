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
                        <Dropdown
                            value={selectedDuration}
                            options={durations}
                            onChange={onDurationChange}
                            placeholder="Select loan duration"
                            optionLabel="label"
                            className="is-fullwidth"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoanApplicationForm;
