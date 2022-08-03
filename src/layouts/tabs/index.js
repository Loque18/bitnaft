import { useRouter } from 'next/router';
import Tab from './tab';

const Tabs = props => {
    const router = useRouter();
    const { tabs } = props;

    const changeActiveTab = tabName => {
        router.push(tabs.find(tab => tab.name === tabName).to);
    };
    const activeTab = tabs.find(tab => tab.to === router.pathname);

    return (
        <div className="tabs is-medium is-boxed has-font-roboto">
            <ul>
                {tabs.map(tab => (
                    <Tab key={tab.name} name={tab.name} changeActiveTab={changeActiveTab} activeTab={activeTab} />
                ))}
            </ul>
        </div>
    );
};

export default Tabs;
