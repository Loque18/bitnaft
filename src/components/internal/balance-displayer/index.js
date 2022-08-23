import { useSelector, useDispatch } from 'react-redux';
import { change_balance_visibility } from 'src/redux/actions';
import formatCurrency from 'src/utils/format-currency';
import DisplayAsteriks from 'src/utils/display-asteriks';

import styles from './styles.module.scss';

const { square1, square2 } = styles;

const Eye = () => <i className="fa-solid fa-eye-slash has-text-md-ref-primary-30" />;
const EyeSlash = () => <i className="fa-solid fa-eye has-text-md-ref-primary-30" />;

const BalanceDisplayer = ({ balance, totalBalance }) => {
    const dispatch = useDispatch();

    const balanceVisibility = useSelector(state => state.balanceDisplayerReducer.balanceVisibility);

    const toggle_balance_visibility = () => {
        dispatch(change_balance_visibility());
    };

    return (
        <div className="is-relative min-w-300">
            <div className={`has-bg-hblue2-o-1 ${square1}`} />
            <div className={`has-bg-hblue2-o-1 ${square2}`} />
            <div className="py-4 px-6">
                <div className="columns mb-1 is-gapless is-mobile">
                    <div className="column is-narrow is-flex is-align-items-center">
                        <p className="is-size-5 has-text-md-source-primary has-font-roboto has-text-weight-medium">
                            Balance
                        </p>
                        <button
                            aria-label={balanceVisibility ? 'Show Balance' : 'Hide Balance'}
                            type="button"
                            className="unstyled-button pl-3"
                            tabIndex={-1}
                            onClick={toggle_balance_visibility}
                            style={{ zIndex: '5' }}
                        >
                            <span className="icon is-small">{balanceVisibility ? <EyeSlash /> : <Eye />}</span>
                        </button>
                    </div>
                </div>
                <div className="columns mb-1 is-mobile">
                    <div className="column">
                        <p
                            className={`${
                                !balanceVisibility ? 'has-text-weight-bold' : 'has-text-weight-medium'
                            } title is-size-4 has-text-md-source-primary-o-9 has-font-pt-mono has-text-weight-medium`}
                        >
                            {balanceVisibility ? formatCurrency(balance) : DisplayAsteriks(5)}
                        </p>
                    </div>
                </div>
                <div className="columns is-gapless is-flex is-flex-direction-column mb-0 is-mobile">
                    <div className="column">
                        <p className="is-size-6 has-text-md-black-o-5 has-font-roboto has-text-weight-medium">Total</p>
                    </div>
                    <div className="column">
                        <p
                            className={`${
                                !balanceVisibility ? 'has-text-weight-bold' : 'has-text-weight-medium'
                            } is-size-6 has-text-md-black-o-5 has-font-pt-mono`}
                        >
                            {balanceVisibility ? formatCurrency(totalBalance) : DisplayAsteriks(5)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceDisplayer;
