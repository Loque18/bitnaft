import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import BitnaftBanner from 'src/layouts/bitnaft-banner';
// import Tabs from 'src/layouts/tabs';
// import { portfolioTabList } from 'src/static/tab-list';
import LoanApplicationForm from 'src/components/internal/loan-application-form';

import requirePageAuth from 'src/functions/require-page-auth';

import api from 'src/api';

import styles from './styles.module.scss';

const { bordered_hr } = styles;

const BorrowPage = ({ error, errorMessage, availableAssets, walletAssets }) => {
    const [hourlyInterest, setHourlyInterest] = useState(0);
    const [dailyInterest, setDailyInterest] = useState(0);
    const [liquidationPrice, setLiquidationPrice] = useState(0);

    const [loanType, setLoanType] = useState('Conventional');

    const { query } = useRouter();

    const [borrowAsset, setBorrowAsset] = useState(null);
    const [collateralAsset, setCollateralAsset] = useState(null);

    useEffect(() => {
        if (query.type) {
            setLoanType(query.type);
        }
    }, [query]);

    if (error) {
        toast.error(errorMessage);
        return null;
    }

    return (
        <div>
            <BitnaftBanner
                title="Bitnaft loans"
                description="Borrow crypto and fiat for your own use case"
                background="borrow-banner"
                loanType={loanType}
            />
            <section className="section">{/* <Tabs tabs={portfolioTabList} /> */}</section>
            <section className="section is-hidden-mobile pt-0">
                {/* TODO: Adjust this section to fit in screens starting from 1024px */}
                <div className="columns mb-0 is-gapless">
                    <div className="column is-narrow is-flex is-align-items-center">
                        <span className="icon pr-1 is-size-4 has-text-md-source-primary">
                            <i className="fas fa-hand-holding-usd" />
                        </span>
                    </div>
                    <div className="column is-narrow is-flex is-align-items-center">
                        <hr className={`${bordered_hr}`} />
                    </div>
                    <div className="column mx-1 is-narrow is-flex is-align-items-center">
                        <span className="icon is-size-4 has-text-md-source-primary">
                            <i className="fas fa-money-bill-transfer" />
                        </span>
                    </div>
                    <div className="column is-narrow is-flex is-align-items-center">
                        <hr className={`${bordered_hr}`} />
                    </div>
                    <div className="column mx-1 is-narrow is-flex is-align-items-center">
                        <span className="icon is-size-4 has-text-md-source-primary">
                            <i className="fas fa-arrow-right-to-bracket" />
                        </span>
                    </div>
                    <div className="column is-narrow is-flex is-align-items-center">
                        <hr className={`${bordered_hr}`} />
                    </div>
                    <div className="column mx-1 is-narrow is-flex is-align-items-center">
                        <span className="icon is-size-4 has-text-md-source-primary">
                            <i className="fa-light fa-coin-front" />
                        </span>
                    </div>
                    <div className="column is-narrow is-flex is-align-items-center">
                        <hr className={`${bordered_hr}`} />
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-flex is-align-items-center">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Create loan request
                        </h1>
                    </div>
                    <div className="column mr-5 is-flex is-align-items-center">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Assets get transfered
                        </h1>
                    </div>
                    <div className="column mr-5 is-flex is-align-items-center">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Pay off your loan
                        </h1>
                    </div>
                    <div className="column mr-6 is-flex is-align-items-center">
                        <h1 className="subtitle has-text-centered has-text-md-black-o-7 has-font-roboto">
                            Get your collateral back
                        </h1>
                    </div>
                </div>
            </section>
            <section className="section pt-0">
                <div className="box">
                    <h1 className="subtitle">
                        <span className="is-capitalized">{loanType} </span>loan
                    </h1>
                    <div className="columns is-reverse">
                        <div className="column is-6">
                            <LoanApplicationForm
                                availableAssets={availableAssets}
                                walletAssets={walletAssets}
                                setHourlyInterest={setHourlyInterest}
                                setDailyInterest={setDailyInterest}
                                setLiquidationPrice={setLiquidationPrice}
                                setBorrowAsset={setBorrowAsset}
                                setCollateralAsset={setCollateralAsset}
                            />
                        </div>
                        <div className="column is-5 is-offset-1">
                            <div className="columns">
                                <div className="column">
                                    <h1 className="is-size-4 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                        Loan to value ratio (LTV)
                                    </h1>
                                    <div className="columns is-mobile">
                                        <div className="column">
                                            <p className="is-size-4 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                                65%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="columns mt-5">
                                <div className="column">
                                    <h1 className="is-size-5 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                        {loanType === 'Conventional' ? (
                                            <span>Hourly interest</span>
                                        ) : (
                                            <span>Hourly profit</span>
                                        )}
                                    </h1>
                                    <div className="columns is-mobile">
                                        <div className="column">
                                            <p className="is-size-5 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                                {hourlyInterest > 0 ? hourlyInterest : '-'} %
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <h1 className="is-size-5 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                        {loanType === 'Conventional' ? (
                                            <span>Daily interest</span>
                                        ) : (
                                            <span>Daily profit</span>
                                        )}
                                    </h1>
                                    <div className="columns is-mobile">
                                        <div className="column">
                                            <p className="is-size-5 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                                {dailyInterest > 0 ? dailyInterest : '-'} %
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="columns mt-5">
                                <div className="column is-narrow">
                                    <h1 className="is-size-5 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                        Liquidation Price ({collateralAsset && collateralAsset.symbol} /{' '}
                                        {borrowAsset && borrowAsset.symbol})
                                    </h1>
                                    <div className="columns is-mobile">
                                        <div className="column">
                                            <p className="is-size-5 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                                {liquidationPrice !== 0 ? liquidationPrice : '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    {/* <h1 className="is-size-5 has-font-roboto has-text-weight-medium has-text-hdarkgray">
                                        Repayment amount
                                    </h1>
                                    <div className="columns is-mobile">
                                        <div className="column">
                                            <p className="is-size-5 has-font-pt-mono has-text-weight-medium has-text-hdarkgray">
                                                -
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

BorrowPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Borrow');
export default BorrowPage;

export const getServerSideProps = requirePageAuth(async (ctx, sessionWithToken) => {
    const { user, token } = sessionWithToken;
    const { email } = user;

    let availableAssets = [];
    let walletAssets = [];

    try {
        const res1 = await api.get.borrowables();

        if (!res1.data.success) {
            throw new Error(res1.data.message);
        }

        availableAssets = res1.data.data;

        const res2 = await api.get.balances({ email, token });

        if (!res2.data.success) {
            if (res2.data.code.toString() === '603') {
                return {
                    props: {},
                    redirect: {
                        destination: '/sessionexpired',
                        permanent: false,
                    },
                };
            }

            throw new Error(res2.data.message);
        }

        walletAssets = res2.data.data;

        // balances = res.data.data;
    } catch (error) {
        return {
            props: { error: true, errorMessage: error.message, walletAssets: [], availableAssets: [] },
        };
    }

    return {
        props: {
            walletAssets,
            availableAssets,
        },
    };
});
