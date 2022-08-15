import Modal from 'src/components/commons/modal';
import CardLayout from 'src/layouts/card';

import { toast } from 'react-toastify';

import Image from 'next/image';

import api from 'src/api';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { start_close_modal } from 'src/redux/actions';

const QRCodeGeneratorModal = () => {
    const dispatch = useDispatch();
    const { qrCodeGeneratorModal } = useSelector(state => state.modalReducer);

    const [qrCode, setQrCode] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        dispatch(start_close_modal());
    };

    const generateQRCode = async () => {
        try {
            setLoading(true);
            const res = await api.get.getQRCode({
                userAddress: '0x327864708eA978ce473E02900755c2746c0Cb7dd',
            });
            setUserAddress('0x327864708eA978ce473E02900755c2746c0Cb7dd');
            setQrCode(res.config.url);

            setLoading(false);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(userAddress).then(toast.success('Address copied to clipboard'));
    };

    useEffect(() => {
        generateQRCode();
    }, []);

    return (
        <Modal isOpen={qrCodeGeneratorModal.isOpen}>
            <div className="resize-manager">
                <div className={`box has-bg-md-white `} style={{ padding: '3px' }}>
                    <div className="box has-bg-md-white ">
                        <CardLayout
                            header={
                                <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                                    <h1 className="subtitle is-size-5 has-text-md-black has-font-roboto has-text-weight-medium is-flex-grow-a">
                                        Receive Crypto
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
                                    <div className="is-flex is-justify-content-center">
                                        {loading ? (
                                            <div className="lds-roller my-4">
                                                <div />
                                                <div />
                                                <div />
                                                <div />
                                                <div />
                                                <div />
                                                <div />
                                                <div />
                                            </div>
                                        ) : (
                                            <figure className="image">
                                                <Image src={qrCode} alt="QR Code" width={256} height={256} />
                                            </figure>
                                        )}
                                    </div>
                                    <div className="columns has-text-centered">
                                        <div className="column is-flex is-justify-content-center is-align-items-center">
                                            <p className="is-size-7 has-text-md-black has-font-roboto has-text-weight-bold">
                                                {userAddress}
                                            </p>
                                            <button className="unstyled-button" type="button" onClick={copyToClipboard}>
                                                <span className="icon has-text-md-black ml-2">
                                                    <i className="fas fa-copy" />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="columns has-text-centered">
                                        <div className="column">
                                            <p className="is-size-6 has-text-md-black has-font-roboto has-text-weight-medium">
                                                Scan this QR from your withdrawal platform or app
                                            </p>
                                        </div>
                                    </div>
                                    <div className="columns is-centered">
                                        <div className="column">
                                            <button
                                                className="button has-bg-hperiwinkle has-text-md-key-colors-primary is-fullwidth"
                                                type="button"
                                                onClick={closeModal}
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default QRCodeGeneratorModal;
