import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import { useDispatch } from 'react-redux';
import { open_modal } from 'src/redux/actions';

import modals from 'src/static/app.modals';

import OwnedAssetsCard from 'src/components/internal/assets-cards/owned-assests-card';
import LoanedAssetsCard from 'src/components/internal/assets-cards/assests-loan-card';

const Dashboard = () => {
    const dispatch = useDispatch();

    const handleCoinManagerModal = () => {
        dispatch(
            open_modal({
                modalName: modals.coinManagerModal,
            })
        );
    };

    const handleQRCodeGeneratorModal = () => {
        dispatch(
            open_modal({
                modalName: modals.qrCodeGeneratorModal,
            })
        );
    };

    return (
        <section className="section">
            <div>
                <h1 className="subtitle is-size-3 has-text-md-source-primary has-font-roboto-medium">
                    Welcome back, user@email.com !
                </h1>
                <div className="columns">
                    <div className="column">
                        <p className="is-size-5 has-text-md-black-o-7 has-font-roboto-medium">Overview</p>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <OwnedAssetsCard
                            title="Wallet"
                            to="/dashboard/wallet"
                            icon="fas fa-wallet"
                            amount={8800.003}
                            cryptoIcons={[
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                            ]}
                            numberOfAssets={15}
                        />
                    </div>
                    <div className="column is-one-fifth">
                        <OwnedAssetsCard
                            title="Savings"
                            to="/dashboard/savings"
                            icon="fa-solid fa-sack-dollar"
                            amount={50523.001}
                            cryptoIcons={[
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                                'https://bitcoin.org/img/icons/opengraph.png?1657703267',
                            ]}
                            numberOfAssets={4}
                        />
                    </div>
                    <div className="column is-one-fifth">
                        <LoanedAssetsCard
                            title="Loans"
                            to="/dashboard/loans"
                            icon="fa-solid fa-hand-holding-dollar"
                            amount={1.5}
                            cryptoIcon="https://bitcoin.org/img/icons/opengraph.png?1657703267"
                            numberOfLoanedAssets={1}
                            payBeforeDate={1659603600}
                        />
                    </div>
                </div>
                <div className="columns pt-5">
                    <div className="column">
                        <button
                            type="button"
                            className="button is-primary is-fullwidth"
                            onClick={handleCoinManagerModal}
                        >
                            Manage Coins
                        </button>
                    </div>
                </div>
                <div className="columns pt-5">
                    <div className="column">
                        <button
                            type="button"
                            className="button is-primary is-fullwidth"
                            onClick={handleQRCodeGeneratorModal}
                        >
                            Generate QR Code
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

Dashboard.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Dashboard');
export default Dashboard;
