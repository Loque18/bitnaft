import Navbar from 'src/components/commons/navbar';
import Footer from 'src/components/commons/footer';

const MainLayout = props => {
    const { children } = props;

    return (
        <>
            <Navbar session={props.session} />
            <div style={{ height: '75px' }} />
            {children}
            <Footer />
        </>
    );
};

export const getLayout = page => <MainLayout session={page.props.session}>{page}</MainLayout>;

export default MainLayout;
