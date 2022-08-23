/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import api from 'src/api';

import styles from 'src/scss/common_modules/form_utils.module.scss';

const { eye_button, input_reset } = styles;

const Eye = () => <i className="fa-solid fa-eye-slash has-text-md-ref-primary-30" />;
const EyeSlash = () => <i className="fa-solid fa-eye has-text-md-ref-primary-30" />;

const Form = () => {
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            password: yup
                .string()
                .test('len', 'Password must be at least 8 characters long', val => val && val.length >= 8)
                .required('Enter your new password'),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required('confirm your password'),
        }),
        onSubmit: async values => {
            setSuccess(false);
            setFailure(false);
            setLoading(true);
            const { password } = values;

            const { query } = router;
            const { email, token } = query;

            try {
                const res = await api.post.resetPassword({ email, resetToken: token, newPassword: password });
                if (res.data.status === 'success') {
                    setSuccess(true);
                    // router.push('/dashboard');
                    // dispatch(update_session({ session: res.data.data }));
                } else {
                    setFailure(true);
                    setErrorMessage(res.data.data.message);
                }
            } catch (err) {
                setErrorMessage('Something went wrong, try again later');
            }

            setLoading(false);

            // dispatch(log_in_request({ email, password }));
        },
    });

    const changePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // useEffect(() => {
    //     if (success) {
    //         // router.push('/dashboard');
    //     }
    // }, [router, success]);

    return (
        <form onSubmit={formik.handleSubmit}>
            {loading ? null : failure ? (
                <div className="notification animate__animated animate__fadeInDown is-danger has-text-centered p-2">
                    {errorMessage.toLowerCase() === 'email not verified' ? (
                        <>
                            {errorMessage}{' '}
                            <Link href={`/checkemail?email=${formik.values.email}`}>
                                <a>Resend email</a>
                            </Link>
                        </>
                    ) : (
                        errorMessage
                    )}
                </div>
            ) : null}
            <div className="field">
                <label className="label is-size-7">New Password</label>
                <div className="control has-icons-left">
                    <input
                        className={`input ${formik.errors.password && formik.touched.password ? 'is-danger' : ''}`}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                    />

                    <span className="icon is-small is-left">
                        <i className="fas fa-at" />
                    </span>

                    <p className="help is-danger">
                        {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                    </p>

                    <br />

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
                <label className="label is-size-7">Confirm password</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className={`input ${
                            formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-danger' : ''
                        } ${input_reset}`}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="confirmPassword"
                    />

                    <span className="icon is-small is-left">
                        <i className="fa-solid fa-lock" />
                    </span>

                    <p className="help is-flex is-flex-direction-row is-justify-content-space-between">
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <span className="has-text-danger">{formik.errors.confirmPassword}</span>
                        ) : (
                            '⠀'
                        )}
                    </p>

                    <br />

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
                        Reset
                    </button>
                </div>
                <br />
            </div>
        </form>
    );
};

export default Form;
