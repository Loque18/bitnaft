import Head from 'next/head';
import appConfig from 'src/static/app.config';

const { appName } = appConfig;

const Page = () => {
    return (
        <>
            <Head>{appName} | pageName</Head>
            <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>Template Page</div>
        </>
    );
};

export default Page;
