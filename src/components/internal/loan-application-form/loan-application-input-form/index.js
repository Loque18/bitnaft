import { InputNumber } from 'primereact/inputnumber';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import modals from 'src/static/app.modals';
import { open_modal } from 'src/redux/actions';

const LoanApplicationInputForm = props => {
    const dispatch = useDispatch();
    const { value, setValue, label, placeholder } = props;

    const handleButtonClick = () => {
        dispatch(
            open_modal({
                modalName: modals.coinManagerModal,
            })
        );
    };

    return (
        <>
            <label className="has-font-roboto has-text-hdarkgray" htmlFor="minmaxfraction">
                {label}
            </label>

            <div className="p-inputgroup pt-2">
                <InputNumber
                    inputId="minmaxfraction"
                    value={value}
                    onChange={e => setValue(e.value)}
                    minFractionDigits={0}
                    maxFractionDigits={18}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    className="has-bg-md-ref-neutral-99 is-clickable p-inputgroup-addon"
                    onClick={handleButtonClick}
                >
                    <div className="columns is-gapless is-mobile">
                        <div className="column is-flex is-narrow">
                            <figure className="image is-24x24 has-margin-right-0 has-margin-left-0">
                                <Image
                                    src="https://bitcoin.org/img/icons/opengraph.png?1657703267"
                                    alt="Bitcoin"
                                    layout="fill"
                                />
                            </figure>
                        </div>
                        <div className="column is-flex is-align-items-center is-narrow ml-2">
                            <p className="is-size-5 has-text-md-black has-font-roboto">BTC</p>
                        </div>
                        <div className="column is-flex is-align-items-center is-narrow">
                            <span className="icon has-text-md-black">
                                <i className="fas fa-caret-down" />
                            </span>
                        </div>
                    </div>
                </button>
            </div>
        </>
    );
};

export default LoanApplicationInputForm;
