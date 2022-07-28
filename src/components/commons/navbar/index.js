/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    // app state
    const { sessionReducer } = useSelector(state => state);

    const { isLoggedIn, sessionData } = sessionReducer;

    //  local state
    const [mobileActive, setMobileActive] = useState(false);
    const [burgerActive, setBurgerActive] = useState(false);
    const [scrolledBgColor, setScrolledBgColor] = useState(false);
    const [scrollingDown, setScrollingDown] = useState(false);

    //  router
    const router = useRouter();

    const handleHamburgerClick = () => {
        const newValue = !mobileActive;

        setBurgerActive(newValue);
        setMobileActive(newValue);
    };

    const handleNavbarItemClick = () => {
        handleHamburgerClick();
    };

    useEffect(() => {
        const element = document.getElementById('__next');
        let oldScroll = 0;
        element.addEventListener('scroll', () => {
            if (element.scrollTop > 50) setScrolledBgColor(true);
            else setScrolledBgColor(false);

            if (oldScroll && oldScroll > element.scrollTop) setScrollingDown(false);
            else setScrollingDown(true);

            oldScroll = element.scrollTop;
        });
    }, []);

    return (
        <nav
            className={`navbar custom-navbar is-fixed-top ${scrolledBgColor ? 'has-navbar-bg-color' : ''} 
            ${scrollingDown ? 'is-hidden-up' : ''}`}
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container is-fluid">
                <div className="navbar-brand">
                    <Link href="/home">
                        <a className="navbar-item" onClick={handleNavbarItemClick} role="button" tabIndex={0}>
                            <h1
                                className="navbar-item title is-italic is-size-4  has-text-md-ref-primary-10"
                                style={{ fontWeight: '700' }}
                            >
                                Bitnaft
                            </h1>
                        </a>
                    </Link>
                    <a
                        role="button"
                        className={`navbar-burger has-text-white ${burgerActive ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={handleHamburgerClick}
                        tabIndex={-1}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>
                <div className={`navbar-menu ${mobileActive ? 'is-active' : ''}`}>
                    <div className="navbar-start">
                        <Link href="/">
                            <a
                                className={`navbar-item is-size-6 has-font-roboto ${
                                    router.pathname === '/dashboard' ? 'is-active' : ''
                                }`}
                                onClick={handleNavbarItemClick}
                                role="button"
                                tabIndex={0}
                            >
                                Dashboard
                            </a>
                        </Link>
                        <Link href="/earn">
                            <a
                                className={`navbar-item is-size-6 has-font-roboto ${
                                    router.pathname === '/earn' ? 'is-active' : ''
                                }`}
                                onClick={handleNavbarItemClick}
                                role="button"
                                tabIndex={0}
                            >
                                Earn
                            </a>
                        </Link>
                        <Link href="/borrow">
                            <a
                                className={`navbar-item is-size-6 has-font-roboto ${
                                    router.pathname === '/borrow' ? 'is-active' : ''
                                }`}
                                onClick={handleNavbarItemClick}
                                role="button"
                                tabIndex={0}
                            >
                                Borrow
                            </a>
                        </Link>
                    </div>
                    {isLoggedIn ? (
                        <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <div className="navbar-link has-font-roboto has-text-md-black">
                                    <Image
                                        src="/media/user.png"
                                        alt="user"
                                        width={64}
                                        height={64}
                                        className="is-rounded"
                                    />
                                    <span className="has-text-md-black has-font-roboto">username@email.com</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="navbar-end">
                            <Link href="/login">
                                <a
                                    href="/replace"
                                    className="navbar-item is-size-6 has-font-roboto "
                                    role="button"
                                    tabIndex={0}
                                >
                                    Login
                                </a>
                            </Link>
                            <Link href="/signup">
                                <a
                                    href="/replace"
                                    className="navbar-item is-size-6 has-font-roboto "
                                    role="button"
                                    tabIndex={0}
                                >
                                    Signup
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
