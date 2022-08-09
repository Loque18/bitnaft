/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import api from 'src/api';
import { http_request } from 'src/redux/actions';
import apiKeys from 'src/static/api_data_keys';

const Form = () => {
    const dispatch = useDispatch();
    const {
        loading,
        success,
        failure,
        error: errorMessage,
    } = useSelector(state => state.httpReducer[apiKeys.resetPassword]);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('invalid email').required('Enter your email'),
        }),
        onSubmit: async values => {
            // setLoading(true);
            dispatch(
                http_request({
                    key: apiKeys.resetPassword,
                    api_method: api.post.requestPasswordReset,
                    params: {
                        email: values.email,
                    },
                })
            );
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {loading ? null : failure ? (
                <div className="notification animate__animated animate__fadeInDown is-danger has-text-centered p-2">
                    {errorMessage}
                </div>
            ) : null}
            {success ? (
                <div className="notification animate__animated animate__fadeInDown is-success has-text-centered p-2">
                    Email sent!
                </div>
            ) : null}
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

            <br />

            <div className="field">
                <div className="control">
                    <button
                        aria-label="Send mail"
                        className={`button is-hblue is-fullwidth ${loading ? 'is-loading' : ''}`}
                        type="submit"
                    >
                        Send mail
                    </button>
                </div>
                <br />
                <div className="has-text-centered">
                    Go back to{' '}
                    <Link href="/login" passHref>
                        <a href="replace">
                            <u>login</u>
                        </a>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default Form;
