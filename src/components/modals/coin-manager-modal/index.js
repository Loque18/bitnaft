/* eslint-disable no-nested-ternary */
import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { start_close_modal } from 'src/redux/actions';
import modals from 'src/static/app.modals';

import AssetsListComponent from './assets-list';
import styles from './styles.module.scss';

const { list } = styles;

const CoinManagerModal = () => {
    // modal reducer
    const dispatch = useDispatch();
    const coinManagerModal = useSelector(state => state.modalReducer[modals.coinManagerModal]);

    const { data } = coinManagerModal;

    // local state

    const [isSearching] = useState(false);
    // const [searchText, setSearchText] = useState('');
    const [loading] = useState(false);
    // const [searchType, setSearchType] = useState('');
    // const [filteredTokens, setFilteredTokens] = useState([]);

    /* *~~*~~*~~*~~*~~* CLICK HANDLERS *~~*~~*~~*~~*~~*~~*~~* */

    // const clear = () => {
    //     setSearchText('');
    //     setIsSearching(false);
    //     setSearchType('');
    // };

    // const clearWithDelay = () => {
    //     setTimeout(() => {
    //         setSearchText('');
    //         setIsSearching(false);
    //         setFilteredTokens([]);
    //     }, 1000);
    // };

    const closeModal = () => {
        // clearWithDelay();
        dispatch(start_close_modal());
    };

    const onSelect = (e, asset) => {
        data.onSelect(asset);
        closeModal();
    };

    /* ~~*~~*~~*~~*~~* INPUT HANDLERS *~~*~~*~~*~~*~~*~~*~~* */

    return (
        <Modal isOpen={coinManagerModal.isOpen}>
            <div className="resize-manager">
                <div className={`box has-bg-md-white `} style={{ padding: '3px' }}>
                    <div className="box has-bg-md-white ">
                        <CardLayout
                            header={
                                <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                    <h1 className="subtitle is-size-5 has-text-md-black has-font-roboto has-text-weight-medium is-flex-grow-a">
                                        Select a coin
                                    </h1>
                                    <button
                                        className="has-text-md-black is-flex unstyled-button"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            }
                            content={
                                <div>
                                    <div className="field">
                                        <p className="control has-icons-left">
                                            <input className="input" type="text" placeholder="Search Assets" />
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-search" />
                                            </span>
                                        </p>
                                    </div>
                                    {isSearching ? (
                                        loading ? (
                                            <ul className={list}>
                                                <li className="subtitle has-text-white has-text-centered">
                                                    Loading...
                                                </li>
                                            </ul>
                                        ) : null
                                    ) : (
                                        <AssetsListComponent
                                            assets={data.availableAssets}
                                            disableAssets={data.disableAssets}
                                            handleSelectAssetClick={onSelect}
                                        />
                                    )}
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CoinManagerModal;
