import { getLayout as getMainLayout } from 'src/layouts/main';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { open_modal } from 'src/redux/actions';
import modals from 'src/static/app.modals';

import styles from './styles.module.scss';

const { selectTokenButton } = styles;

const WithdrawPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const openCoinManagerModal = () => {
        dispatch(
            open_modal({
                modalName: modals.coinManagerModal,
            })
        );
    };

    const redirectToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <section className="section pt-4">
            <div className="container">
                <div className="is-flex is-align-items-center">
                    <button type="button" className="unstyled-button" onClick={redirectToDashboard}>
                        <span className="icon is-small has-text-md-black">
                            <i className="is-clickable fas fa-chevron-left" />
                        </span>
                    </button>
                    <h1 className="is-size-6 has-text-md-black has-font-roboto has-text-weight-medium pl-2">
                        Withdraw
                    </h1>
                </div>
                <div className="columns pt-4">
                    <div className="column">
                        <form action="#" className="box">
                            <div className="field">
                                <label className="label">Asset</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className="input is-clickable"
                                        readOnly
                                        value="Ethereum"
                                        tabIndex="-1"
                                        onClick={openCoinManagerModal}
                                    />
                                    <span className="icon has-text-md-black is-right" style={{ opacity: '0.75' }}>
                                        <i className="fa-solid fa-caret-down" />
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
WithdrawPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Withdraw');
export default WithdrawPage;
