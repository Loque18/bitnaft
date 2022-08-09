/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import formatCurrency from 'src/utils/format-currency';
import Link from 'next/link';
import Image from 'next/image';

const PortfolioCard = () => {
    const cryptoIcons = [
        'https://bitcoin.org/img/icons/opengraph.png?1657703267',
        'https://bitcoin.org/img/icons/opengraph.png?1657703267',
        'https://bitcoin.org/img/icons/opengraph.png?1657703267',
        'https://bitcoin.org/img/icons/opengraph.png?1657703267',
    ];

    const numberOfAssets = 4;

    return (
        <section className="section">
            <h1 className="title is-size-4 has-text-md-black-o-7 has-font-roboto has-text-weight-light">Overview</h1>
            <div className="columns">
                <div className="column">
                    <div className="box rounded-shadow-box">
                        <div className="columns is-mobile">
                            <div className="column is-flex is-justify-content-flex-start is-align-items-center">
                                <span className="icon is-size-5 is-size-6-mobile">
                                    <i className="has-text-md-source-primary fa-solid fa-briefcase" />
                                </span>
                                <h1 className="subtitle is-size-5 is-size-6-mobile has-text-md-source-primary has-font-roboto pl-2">
                                    Portfolio
                                </h1>
                            </div>
                            <div className="column is-flex is-justify-content-flex-end is-align-items-center">
                                <Link href="/earn/portfolio">
                                    <a className="is-size-6 is-size-7-mobile has-text-md-source-primary is-underlined has-text-weight-light has-font-roboto">
                                        go to your portfolio
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-flex is-justify-content-flex-start is-align-items-center pt-0">
                                <h1 className="subtitle mb-0 has-text-md-black-o-7 has-font-roboto is-size-5 is-size-6-mobile">
                                    Balance
                                </h1>
                                <p className="is-size-5 is-size-6-mobile has-text-md-black-o-7 has-font-pt-mono pl-6">
                                    {formatCurrency(50523.001)}
                                </p>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-flex is-align-items-center pt-0">
                                <h1 className="subtitle mb-0 has-text-md-black-o-7 has-font-roboto is-size-5 is-size-7-mobile">
                                    Interest paid
                                </h1>
                                <p className="is-size-5 is-size-7-mobile has-text-hgreen has-font-pt-mono pl-6">
                                    {formatCurrency(1263.4)}
                                </p>
                            </div>
                            <div className="column is-flex is-justify-content-flex-end is-align-items-center">
                                <div className="columns is-mobile">
                                    <div className="column is-justify-content-flex-start stacked-images is-flex">
                                        {cryptoIcons.map((link, index) => (
                                            <figure className="image is-24x24" key={index}>
                                                <Image
                                                    className="is-rounded shadowed-logo"
                                                    src={link}
                                                    layout="fill"
                                                    alt=""
                                                />
                                            </figure>
                                        ))}
                                    </div>
                                    <div className="column is-flex is-justify-content-flex-end is-align-items-center">
                                        <p className="is-size-7 has-text-md-black-o-7 has-text-weight-bold has-font-roboto">
                                            {numberOfAssets === 0 ? 'No assets' : `${numberOfAssets} assets`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default PortfolioCard;
