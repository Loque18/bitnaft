/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import { start_close_modal } from 'src/redux/actions';

import modals from 'src/static/app.modals';

const RedeemSuccessfullModal = () => {
    const dispatch = useDispatch();
    const redeemSuccessfullModal = useSelector(state => state.modalReducer[modals.redeemSuccessfullModal]);

    const { data } = redeemSuccessfullModal;

    const handleCloseClick = () => {
        dispatch(start_close_modal(modals.redeemSuccessfullModal));
    };

    return (
        <Modal isOpen={redeemSuccessfullModal.isOpen}>
            <div className="resize-manager">
                <div className="box has-bg-md-white ">
                    <CardLayout
                        header={
                            <div className="is-flex is-justify-content-center">
                                <figure className="image is-64x64">
                                    <Image src="/media/icons/checked.png" alt="" layout="fill" />
                                </figure>
                            </div>
                        }
                        content={
                            <div>
                                <section className="my-5">
                                    <h1 className="subtitle has-text-md-black has-font-roboto has-text-weight-medium has-text-centered">
                                        Redeemed successfully
                                    </h1>
                                </section>
                                <section className="py-5">
                                    <div className="is-flex is-justify-content-space-between">
                                        <h1 className="title is-size-6">Redeemed amount</h1>
                                        <h1 className=" is-size-6 has-text-right">
                                            {data && data.amount} {data && data.asset && data.asset.symbol}
                                        </h1>
                                    </div>
                                    <div className="is-flex is-justify-content-space-between">
                                        <h1 className="title is-size-6">Duration</h1>
                                        <h1 className=" is-size-6 has-text-right">Flexible</h1>
                                    </div>
                                </section>
                                <section className="has-text-centered">
                                    <button className="button is-hblue" onClick={handleCloseClick} type="button">
                                        Close
                                    </button>
                                </section>
                            </div>
                        }
                    />
                </div>
            </div>
        </Modal>
    );
};

export default RedeemSuccessfullModal;
