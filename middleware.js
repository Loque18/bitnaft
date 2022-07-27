/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import * as yup from 'yup';

import api from 'src/api';

export async function middleware(req) {
    const { origin } = req.nextUrl;

    if (req.nextUrl.pathname.startsWith('/checkemail')) {
        const email = req.nextUrl.searchParams.get('email');

        const schema = yup.object().shape({
            email: yup.string().email().required('required'),
        });

        const isValid = schema.isValidSync({ email });

        if (!isValid) {
            return NextResponse.redirect(`${origin}/signup`);
        }
    }

    if (req.nextUrl.pathname.startsWith('/verifyemail')) {
        const email = req.nextUrl.searchParams.get('email');
        const token = req.nextUrl.searchParams.get('verificationToken');

        const schema = yup.object().shape({
            email: yup.string().email().required('required'),
            token: yup.string().required('required'),
        });

        const isValid = schema.isValidSync({ email, token });

        if (!isValid) {
            return NextResponse.redirect(`${origin}/404`);
        }
    }

    return NextResponse.next();
}
