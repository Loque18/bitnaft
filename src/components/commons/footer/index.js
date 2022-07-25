/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="footer pb-5" style={{ background: '#111223' }}>
            <div className="content has-text-centered">
                <div className="columns">
                    <div className="column">
                        <h1 className="title is-italic is-size-2  has-text-white" style={{ fontWeight: '700' }}>
                            Bitnaft
                        </h1>
                    </div>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-narrow footer-column">
                                <h2 className="has-text-white has-font-roboto">About</h2>
                                <ul className="footer-list has-text-hgray has-font-roboto">
                                    <li>
                                        <Link href="/our-services">
                                            <a className="has-text-hgray has-font-roboto">Our Services</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/security">
                                            <a className="has-text-hgray has-font-roboto">Security</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/careers">
                                            <a className="has-text-hgray has-font-roboto">Careers</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-of-services">
                                            <a className="has-text-hgray has-font-roboto">Terms of Services</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-narrow footer-column">
                                <h2 className="has-text-white has-font-roboto">Contact</h2>
                                <ul className="footer-list has-text-hgray has-font-roboto">
                                    <li>
                                        <Link href="/support">
                                            <a className="has-text-hgray has-font-roboto">Support</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/feedback">
                                            <a className="has-text-hgray has-font-roboto">Give Us Feedback</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/careers">
                                            <a className="has-text-hgray has-font-roboto">Careers</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-of-services">
                                            <a className="has-text-hgray has-font-roboto">Terms of Services</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-narrow">
                                <h2 className="has-text-white has-font-roboto">Community</h2>
                                <ul className="footer-list has-text-hgray is-flex is-flex-direction-row is-align-items-baseline">
                                    <li className="mr-5">
                                        <a
                                            href="https://www.facebook.com/bitnaft"
                                            className="has-text-hgray has-font-roboto"
                                        >
                                            <span className="icon has-text-hgray is-size-3">
                                                <i className="fa-brands fa-facebook-f" />
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mr-5">
                                        <a
                                            href="https://twitter.com/bitnaft"
                                            className="has-text-hgray has-font-roboto"
                                        >
                                            <span className="icon has-text-hgray is-size-3">
                                                <i className="fab fa-twitter" />
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mr-5">
                                        <a
                                            href="https://www.instagram.com/bitnaft"
                                            className="has-text-hgray has-font-roboto"
                                        >
                                            <span className="icon has-text-hgray is-size-3">
                                                <i className="fab fa-instagram" />
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="has-bg-md-ref-primary-70-o-25" />
                <p className="has-text-hgray has-font-roboto has-text-md-white">BITNAFT © {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;
