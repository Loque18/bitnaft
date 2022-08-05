/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';

import requirePageAuth from 'src/functions/require-page-auth';

const PrivatePage = ({ session, gallery }) => {
    return (
        <div style={{ height: '100vh' }}>
            <div className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title ">
                            Private page{' '}
                            <small className="is-size-6">
                                <Link href="/public">
                                    <a>
                                        <u>public page</u>
                                    </a>
                                </Link>
                            </small>
                        </h1>

                        <h2 className="subtitle has-text-wqhite">Welcome back, {session.user.email}</h2>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="columns">
                    {gallery.map((item, index) => {
                        return (
                            <div className="column is-3" key={index}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src={item.image} alt={item.title} />
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <div className="media-content">
                                            <p className="title is-4">{item.title}</p>
                                            <p className="subtitle is-6">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

PrivatePage.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Private');

export default PrivatePage;

export const getServerSideProps = requirePageAuth((context, session) => {
    return {
        props: {
            session,
            gallery: [
                {
                    id: '1',
                    title: 'Foto de una noche de sol',
                    image: 'https://picsum.photos/id/1/200/300',
                },
                {
                    id: '2',
                    title: 'un perro muy bonito',
                    image: 'https://picsum.photos/id/2/200/300',
                },
            ],
        },
    };
});
