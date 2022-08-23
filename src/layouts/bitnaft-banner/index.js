const BitnaftBanner = props => {
    const { title, description, background, loanType } = props;
    return (
        <section className={`hero has-bg-${background}`}>
            <div className="hero-body">
                <div className="container">
                    <div className="columns">
                        <div className="column is-narrow">
                            <h1 className="title is-size-3 has-text-md-source-primary has-font-roboto-medium">
                                {loanType !== undefined ? (
                                    <span>
                                        {title} | {loanType}
                                    </span>
                                ) : (
                                    <span>{title}</span>
                                )}
                            </h1>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-narrow">
                            <p className="is-size-5 has-text-md-black-o-5 has-font-roboto-medium">{description}</p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BitnaftBanner;
