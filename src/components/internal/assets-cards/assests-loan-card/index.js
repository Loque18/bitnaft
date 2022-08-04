import Image from 'next/image';
import Link from 'next/link';

import formatDate from 'src/utils/format-date';

const LoanedAssetsCard = props => {
    const { title, icon, amount, cryptoIcon, numberOfLoanedAssets, to, payBeforeDate } = props;

    return (
        <Link href={to}>
            <div className="box rounded-shadowed-box is-clickable min-w-250">
                <div className="columns mb-0">
                    <div className="column is-flex is-justify-content-flex-start is-align-items-center">
                        <span className="icon is-size-5">
                            <i className={`has-text-md-source-primary ${icon}`} />
                        </span>
                        <h1 className="subtitle is-size-5 has-text-md-source-primary has-font-roboto pl-2">{title}</h1>
                    </div>
                </div>
                <div className="columns mb-0 is-gapless">
                    <div className="column is-flex is-narrow">
                        <p className="has-text-md-black has-font-roboto is-size-6" style={{ opacity: '75%' }}>
                            Last Asset Borrowed
                        </p>
                    </div>
                    <div className="column is-flex is-flex-direction-column is-align-items-flex-end">
                        <p
                            className="is-size-7 is-underlined has-text-md-black has-text-weight-light has-font-roboto pb-2"
                            style={{ opacity: '75%' }}
                        >
                            Pay Before
                        </p>
                        <p
                            className="is-size-6 has-text-md-black has-text-weight-light has-font-roboto"
                            style={{ opacity: '75%', letterSpacing: '0.5px' }}
                        >
                            {formatDate(payBeforeDate)}
                        </p>
                    </div>
                </div>
                <div className="columns mb-0 is-mobile">
                    <div
                        className="column is-flex is-justify-content-flex-start is-align-items-center"
                        style={{ marginTop: '-0.5rem' }}
                    >
                        <figure className="image is-24x24">
                            <Image className="is-rounded shadowed-logo" src={cryptoIcon} layout="fill" alt="" />
                        </figure>
                        <h1
                            className="subtitle is-size-5 has-text-md-black has-font-pt-mono pl-2"
                            style={{ opacity: '75%' }}
                        >
                            {amount}
                        </h1>
                    </div>
                </div>
                <div className="columns is-mobile pt-1">
                    {numberOfLoanedAssets === 0 ? (
                        <p
                            className="is-size-7 has-text-md-black has-text-weight-bold has-font-roboto"
                            style={{ opacity: '75%' }}
                        >
                            No loans
                        </p>
                    ) : (
                        <div className="column is-flex is-justify-content-flex-start is-align-items-center">
                            <p
                                className="is-size-7 has-text-md-black has-text-weight-bold has-font-roboto"
                                style={{ opacity: '75%' }}
                            >
                                Current loans
                            </p>
                            <p
                                className="is-size-7 has-text-md-black has-text-weight-bold has-font-pt-mono pl-3"
                                style={{ opacity: '75%' }}
                            >
                                {numberOfLoanedAssets}
                                <span className="has-font-roboto"> asset(s)</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default LoanedAssetsCard;
