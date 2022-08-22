/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { clear_session } from 'src/redux/actions';
import useSession from 'src/hooks/useSession';
import axios from 'axios';

const Navbar = () => {
    // app state
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [loLoading, setLoLoading] = useState(false);
    // const [loSuccess, setLoSuccess] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loFailure, setLoFailure] = useState(false);
    // const [loErrorMessage, setLoErrorMessage] = useState('');

    //  local state
    const [mobileActive, setMobileActive] = useState(false);
    const [burgerActive, setBurgerActive] = useState(false);
    const [scrolledBgColor, setScrolledBgColor] = useState(false);
    const [scrollingDown, setScrollingDown] = useState(false);

    const { isLoggedIn, user } = useSession();

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

    const handleLogoutClick = async () => {
        setLoLoading(true);

        try {
            const res = await axios('/api/auth/logout', { method: 'post' });

            if (res.data.status === 'success') {
                router.replace('/home');
                dispatch(clear_session());
            } else throw new Error(res.data.data.message);
        } catch (err) {
            setLoFailure(true);

            toast.error(err.message);
        }

        setLoLoading(false);
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
            <div className="navbar-brand is-flex is-align-items-center">
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
                    <span className="has-text-md-source-primary" aria-hidden="true" />
                    <span className="has-text-md-source-primary" aria-hidden="true" />
                    <span className="has-text-md-source-primary" aria-hidden="true" />
                </a>
            </div>
            <div className={`navbar-menu ${mobileActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <Link href="/dashboard">
                        <a
                            className={`navbar-item is-size-6 has-font-roboto ${
                                router.pathname.includes('/dashboard') ? 'is-active' : ''
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
                            <div className="navbar-link is-flex is-align-items-center has-font-roboto has-text-md-black">
                                <Image
                                    src="/media/user.png"
                                    alt="user"
                                    width={64}
                                    height={64}
                                    className="is-rounded "
                                />
                                &nbsp;&nbsp;
                                <span className="has-text-md-black has-font-roboto">{user.email}</span>
                            </div>
                            <div className="navbar-dropdown">
                                <a className="navbar-item" onClick={handleLogoutClick}>
                                    Log out
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <Link href="/login">
                            <a className="navbar-item is-size-6 has-font-roboto " role="button" tabIndex={0}>
                                Login
                            </a>
                        </Link>
                        <Link href="/signup">
                            <a className="navbar-item is-size-6 has-font-roboto " role="button" tabIndex={0}>
                                Signup
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
