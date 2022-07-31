import Image from 'next/image';
import styles from '../styles.module.scss';

const { assets_list, sbutton } = styles;

const AssetsList = props => {
    const { assets, handleSelectAssetClick } = props;

    return (
        <ul className={`${assets_list} coolscroll-small has-font-roboto pr-2`}>
            {assets.slice(0, 10).map(asset => (
                <li className="py-4" key={asset.name.official}>
                    <button
                        className={sbutton}
                        onClick={handleSelectAssetClick}
                        type="button"
                        data-token={JSON.stringify(asset)}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <div className="is-flex is-justify-content-space-between is-flex-direction-row is-align-items-center">
                            <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-start">
                                <figure className="image is-32x32 mx-4">
                                    <Image className="is-rounded" src={asset.flags.png} alt="" layout="fill" />
                                </figure>

                                <div className="">
                                    <h1 className="subtitle is-5 has-text-md-black mb-0 has-text-left">{asset.cca3}</h1>
                                    <h1 className="subtitle has-text-md-ref-neutral-60 is-6 mb-0 has-text-left">
                                        {asset.name.common}
                                    </h1>
                                </div>
                            </div>
                            <div className="is-flex is-flex-direction-row is-align-items-center">
                                <div className="pr-4">
                                    <p className="is-6 has-text-md-ref-neutral-60">Balance</p>
                                </div>
                                <p className="is-6 has-font-pt-mono has-text-md-black">{asset.population}</p>
                            </div>
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default AssetsList;
