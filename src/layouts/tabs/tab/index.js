/* eslint-disable jsx-a11y/anchor-is-valid */

const Tab = props => {
    const { name, activeTab, changeActiveTab } = props;

    return (
        <li className={activeTab && activeTab.name === name ? 'is-active' : ''}>
            <button type="button" className="unstyled-button min-w-200" onClick={() => changeActiveTab(name)}>
                <a>{name}</a>
            </button>
        </li>
    );
};

export default Tab;
