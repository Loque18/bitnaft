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
        <div className="tabs is-size-5 is-size-7-mobile is-boxed has-font-roboto">
            <ul>
                {tabs.map(tab => (
                    <Tab key={tab.name} name={tab.name} changeActiveTab={changeActiveTab} activeTab={activeTab} />
                ))}
            </ul>
        </div>
    );
};

export default Tabs;
