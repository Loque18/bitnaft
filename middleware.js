/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import * as yup from 'yup';

export function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/verifyemail')) {
        const email = req.nextUrl.searchParams.get('email');

        const schema = yup.object().shape({
            email: yup.string().email().required('required'),
        });

        const isValid = schema.isValidSync({ email });

        const { origin } = req.nextUrl;
        if (!isValid) {
            return NextResponse.redirect(`${origin}/signup`);
        }
    }

    return NextResponse.next();
}
