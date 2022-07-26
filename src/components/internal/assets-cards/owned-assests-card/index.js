/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import NumberFormatter from 'src/utils/number-formatter';

const OwnedAssetsCard = props => {
    const { title, icon, amount, cryptoIcons, numberOfAssets } = props;

    return (
        <div className="box rounded-shadowed-box">
            <div className="columns">
                <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                    <span className="icon is-size-5">
                        <i className={`has-text-md-source-primary ${icon}`} />
                    </span>
                    <h1 className="subtitle is-size-5 has-text-md-source-primary has-font-roboto-medium pl-2">
                        {title}
                    </h1>
                </div>
            </div>
            <div className="columns">
                <div className="column pt-0 is-narrow">
                    <p className="has-text-md-black has-font-pt-mono is-size-5" style={{ opacity: '75%' }}>
                        ${NumberFormatter(amount)}
                    </p>
                </div>
            </div>
            <div className="columns pt-5">
                <div className="column stacked-images is-flex">
                    {cryptoIcons.map(link => (
                        <figure className="image is-24x24" key={link}>
                            <Image className="is-rounded shadowed-logos" src={link} layout="fill" />
                        </figure>
                    ))}
                </div>
                <div className="column is-flex is-justify-content-flex-end is-align-items-center">
                    <p className="is-size-7 has-text-md-black has-font-roboto-medium" style={{ opacity: '75%' }}>
                        {numberOfAssets === 0 ? 'No assets' : `${numberOfAssets} assets`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OwnedAssetsCard;
