import { useState } from 'react';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import api from 'src/api';

import requirePageAuth from 'src/functions/require-page-auth';
import { toast } from 'react-toastify';

const FaucetPage = ({ user }) => {
    const [selectedToken, setSelectedToken] = useState('Select Token');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleTokenClick = (e, assetName) => {
        setSelectedToken(assetName);
        setDropdownOpen(false);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post.faucet({ email: user.email, crypto: selectedToken });

            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            }

            toast.info('Crypto sent');
            // eslint-disable-next-line no-shadow
        } catch (e) {
            toast.error('Something went wront');
        }
        setLoading(false);
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div style={{ height: '100vh' }}>
            <div className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Faucet</h1>
                    </div>
                </div>
            </div>
            <br />
            <section>
                <div className="container is-flex is-justify-content-center">
                    <div className="box resize-manager">
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <div className={`dropdown faucet-select ${dropdownOpen ? 'is-active' : ' '}`}>
                                    <div className="dropdown-trigger">
                                        <button
                                            className="button is-fullwidth has-background-hdark-o-5 has-border-2-hpink-o-10 has-text-hpink"
                                            aria-haspopup="true"
                                            aria-controls="dropdown-menu"
                                            type="button"
                                            onClick={handleDropdownToggle}
                                        >
                                            <span>{selectedToken}</span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                        <div className="dropdown-content">
                                            <button
                                                href="#"
                                                className="dropdown-item unstyled-button is-clickable"
                                                onClick={e => handleTokenClick(e, 'bitcoin')}
                                                type="button"
                                            >
                                                Bitcoin
                                            </button>
                                            <button
                                                href="#"
                                                className="dropdown-item unstyled-button is-clickable"
                                                onClick={e => handleTokenClick(e, 'ethereum')}
                                                type="button"
                                            >
                                                Ethereum
                                            </button>
                                            <button
                                                href="#"
                                                className="dropdown-item unstyled-button is-clickable"
                                                onClick={e => handleTokenClick(e, 'tether')}
                                                type="button"
                                            >
                                                Tether
                                            </button>
                                            <button
                                                href="#"
                                                className="dropdown-item unstyled-button is-clickable"
                                                onClick={e => handleTokenClick(e, 'solana')}
                                                type="button"
                                            >
                                                Solana
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <button
                                    className={`button is-fullwidth is-hgra1 is-hblue is-medium ${
                                        loading ? 'is-loading' : ''
                                    }`}
                                    type="submit"
                                    disabled={selectedToken === 'Select Token'}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

FaucetPage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Faucet');

export default FaucetPage;

export const getServerSideProps = requirePageAuth((ctx, sessionWithToken) => {
    const { user } = sessionWithToken;

    return {
        props: {
            user,
        },
    };
});
