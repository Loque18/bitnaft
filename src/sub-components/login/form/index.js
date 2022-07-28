/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import styles from 'src/scss/common_modules/form_utils.module.scss';
import { log_in_request } from 'src/redux/actions';

const { eye_button } = styles;

const Eye = () => <i className="fa-solid fa-eye has-text-md-ref-primary-30" />;
const EyeSlash = () => <i className="fa-solid fa-eye-slash has-text-md-ref-primary-30" />;

const Form = () => {
    const dispatch = useDispatch();
    const { sessionReducer } = useSelector(state => state);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const { loading } = sessionReducer;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email().required('Please enter your email'),
            password: yup.string().required('Please enter your password'),
        }),
        onSubmit: async values => {
            // setLoading(true);

            const { email, password } = values;

            dispatch(log_in_request({ email, password }));
        },
    });

    const changePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="field">
                <label className="label is-size-7">Email</label>
                <div className="control has-icons-left">
                    <input
                        className={`input ${formik.errors.email && formik.touched.email ? 'is-danger' : ''}`}
                        type="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="email"
                    />

                    <span className="icon is-small is-left">
                        <i className="fas fa-at" />
                    </span>

                    <p className="help is-danger">
                        {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                    </p>
                </div>
            </div>

            <div className="field">
                <label className="label is-size-7">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className={`input ${formik.touched.password && formik.errors.password ? 'is-danger' : ''}`}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                    />

                    <span className="icon is-small is-left">
                        <i className="fa-solid fa-lock" />
                    </span>

                    {formik.touched.password && formik.errors.password ? (
                        <p className="help is-danger">{formik.errors.password}</p>
                    ) : (
                        '⠀'
                    )}

                    <button
                        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                        className={`unstyled-button ${eye_button}`}
                        type="button"
                        onClick={changePasswordVisibility}
                        style={{ zIndex: '5' }}
                        tabIndex="-1"
                    >
                        <span className="icon is-small">{passwordVisible ? <EyeSlash /> : <Eye />}</span>
                    </button>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button
                        aria-label="Log in"
                        className={`button is-hblue is-fullwidth ${loading ? 'is-loading' : ''}`}
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <br />
                <div className="has-text-centered">
                    Not a member yet?{' '}
                    <Link href="/signup" passHref>
                        <a href="replace" className="has-text-md-source-primary">
                            <u>Create an account</u>
                        </a>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default Form;
