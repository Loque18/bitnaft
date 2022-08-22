/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import Link from 'next/link';
import formatCurrency from 'src/utils/format-currency';

const OwnedAssetsCard = props => {
    const { title, icon, amount, cryptoIcons, numberOfAssets, to } = props;

    return (
        <Link href={to}>
            <div className="box rounded-shadowed-box is-clickable min-w-250">
                <div className="columns">
                    <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                        <span className="icon is-size-5">
                            <i className={`has-text-md-source-primary ${icon}`} />
                        </span>
                        <h1 className="subtitle is-size-5 has-text-md-source-primary has-font-roboto pl-2">{title}</h1>
                    </div>
                </div>
                <div className="columns">
                    <div className="column pt-0 is-narrow">
                        <p className="has-text-md-black-o-7 has-font-pt-mono is-size-5">{formatCurrency(amount)}</p>
                    </div>
                </div>
                <div className="columns is-mobile pt-5">
                    <div className="column stacked-images is-flex">
                        {cryptoIcons.map((link, index) => (
                            <figure className="image is-24x24" key={index}>
                                <Image className="is-rounded shadowed-logo" src={link} layout="fill" alt="" />
                            </figure>
                        ))}
                    </div>
                    <div className="column is-flex is-justify-content-flex-end is-align-items-center">
                        <p className="is-size-7 has-text-md-black-o-7 has-text-weight-bold has-font-roboto">
                            {numberOfAssets !== 0 ? 'No assets' : `${numberOfAssets} assets`}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OwnedAssetsCard;
