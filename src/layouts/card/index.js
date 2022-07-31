import styles from './styles.module.scss';
// import PropTypes from 'prop-types';

const { card_layout, header_s, content_s, footer_s } = styles;

const TokenSearchModalLayout = props => {
    const { content, header, footer } = props;
    return (
        <div className={card_layout}>
            <header className={header_s}>{header}</header>

            <section className={content_s}>{content}</section>

            {footer ? <footer className={footer_s}>{footer}</footer> : null}
        </div>
    );
};

// TokenSearchModalLayout.propTypes = {
//     header: PropTypes.node,
//     content: PropTypes.node,
//     footer: PropTypes.node
// };

export default TokenSearchModalLayout;
