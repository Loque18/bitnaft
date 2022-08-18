import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dropdown } from 'primereact/dropdown';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import requirePageAuth from 'src/functions/require-page-auth';

const cryptos = [
    { label: 'Bitcoin', value: 'bitcoin' },
    { label: 'Ethereum', value: 'ethereum' },
    { label: 'Thether', value: 'thether' },
    { label: 'Cardano', value: 'cardano' },
    { label: 'Solana', value: 'solana' },
];

const FaucetPage = () => {
    const formik = useFormik({
        initialValues: {
            crypto: cryptos[0].value,
        },
        validationSchema: yup.object({
            crypto: yup.string().required(),
        }),
        onSubmit: values => {
            console.log(values);
        },
    });

    const onCryptoChange = e => {
        formik.setFieldValue('crypto', e.value);
    };

    const selectedCryptoTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.label}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };
    return (
        <section style={{ height: '100vh' }}>
            <div className="hero has-bg-md-source-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title has-text-md-source-primary has-font-roboto has-text-weight-medium has-text-white">
                            Admin Faucet
                        </h1>
                    </div>
                </div>
            </div>

            <br />

            <div className="container is-flex is-justify-content-center">
                <div>
                    <div className="">
                        <Dropdown
                            value={formik.values.crypto}
                            options={cryptos}
                            onChange={onCryptoChange}
                            optionLabel="name"
                            placeholder="Select a Crypto"
                        />
                        <button className="button is-hblue outlined" type="submit">
                            Send crypto
                        </button>
                    </div>
                    <div>
                        <h1 className="selected">Selected: {formik.values.crypto}</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

FaucetPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Faucet ');

export default FaucetPage;

export const getServerSideProps = requirePageAuth();
