import styles from './styles.module.scss';

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

export default TokenSearchModalLayout;
