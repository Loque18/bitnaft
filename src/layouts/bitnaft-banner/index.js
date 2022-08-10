const BitnaftBanner = props => {
    const { title, description, background } = props;
    return (
        <section className={`hero has-bg-${background}`}>
            <div className="hero-body">
                <div className="columns">
                    <div className="column is-narrow">
                        <h1 className="title is-size-3 has-text-md-source-primary has-font-roboto-medium">{title}</h1>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-narrow">
                        <p className="is-size-5 has-text-md-black-o-5 has-font-roboto-medium">{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BitnaftBanner;
