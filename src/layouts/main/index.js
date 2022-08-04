import Navbar from 'src/components/commons/navbar';
import Footer from 'src/components/commons/footer';

const MainLayout = props => {
    const { children } = props;

    return (
        <>
            <Navbar />
            <div style={{ height: '75px' }} />
            {children}
            <Footer />
        </>
    );
};

export const getLayout = page => <MainLayout>{page}</MainLayout>;

export default MainLayout;
