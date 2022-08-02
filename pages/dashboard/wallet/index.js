import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import { useRouter } from 'next/router';

import AssetsList from 'src/components/modals/coin-manager-modal/assets-list';
import BalanceDisplayer from 'src/components/internal/balance-displayer';

const WalletPage = () => {
    const router = useRouter();

    const redirectToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <section className="section pt-4">
            <div className="is-flex is-align-items-center">
                <button type="button" className="unstyled-button" onClick={redirectToDashboard}>
                    <span className="icon is-small has-text-md-black">
                        <i className="is-clickable fas fa-chevron-left" />
                    </span>
                </button>
                <h1 className="is-size-6 has-text-md-black has-font-roboto has-text-weight-medium pl-2">
                    Dashboard / Wallet
                </h1>
            </div>
            <div className="columns pt-4">
                <div className="column is-one-fifth">
                    <BalanceDisplayer />
                </div>
            </div>
            <div className="columns py-4">
                <div className="column">Hide</div>
            </div>
        </section>
    );
};

WalletPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Wallet');
export default WalletPage;
