import React from 'react';
import OutlinedButton from '../button/OutlinedButton';
export class TabController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tab: null,
        };
    }
    componentDidUpdate(prevProps, prevState) {
        (async () => {
            let state = this.state;
            let didStateUpdate = false;
            //Update the stored active tab
            if (prevProps.active_tab_id !== this.props.active_tab_id) {
                state.active_tab = this.getActiveTab();
            }
            //Re-render
            if (didStateUpdate) {
                await new Promise((resolve, reject) => {
                    this.setState(state, () => resolve());
                });
            }
        })();
    }
    render() {
        let { tabs } = this.props;
        let active_tab = this.getActiveTab();
        let tab_content = active_tab.content;
        let tab_heads = tabs.map((tab, idx) => {
            let activeClass = tab.id === active_tab.id ? 'tab-active' : '';
            return (
                <OutlinedButton className={`${activeClass} no-outline subtle`} key={idx} onClick={() => this.activateTab(tab)} label={tab.header} />
            );
        });
        return (
            <div className="h-100 m-0" style={{ display: 'flex', flexDirection: 'column' }}>
                <TabControllerHeadsDesktop tabs={tabs} active_tab={active_tab} />
                <div className="w-100" style={{ backgroundColor: '#363A43', flex: '1', margin: 'auto' }}>
                    <div className="h-100" style={{ display: 'flex' }}>
                        {tab_content}
                    </div>
                </div>
            </div>
        );
    }

    activateTab(tab) {
        let { onTabClicked = () => {} } = this.props;
        this.setState({ active_tab: tab });
        onTabClicked(tab);
    }

    getActiveTab() {
        let { active_tab } = this.state;
        let { tabs, active_tab_id } = this.props;
        for (let tab of tabs) {
            if (tab.id === active_tab_id) {
                return tab;
            }
        }
        return active_tab;
    }
}
export default TabController;

/**
 *
 * @param {{ tabs: Tab[], active_tab: { id: string }}} props
 */
function TabControllerHeadsDesktop(props) {
    const { tabs, active_tab } = props;
    let tabHeaderStyle = { display: 'flex', padding: '3px', width: '130px', height: '40px', alignItems: 'center' };
    /** @type {React.CSSProperties} */
    let tabHeaderTextStyle = { display: 'inline-block', flexGrow: 1, textAlign: 'center' };
    let tab_heads = tabs.map((tab, idx) => {
        const { icon, title } = tab;
        let activeClass = tab.id === active_tab.id ? 'tab-active' : '';
        return (
            <OutlinedButton
                className={`${activeClass} no-outline subtle`}
                key={idx}
                onClick={() => this.activateTab(tab)}
                label={
                    <div style={tabHeaderStyle}>
                        {icon}
                        <div className="font-md" style={tabHeaderTextStyle}>
                            {title}
                        </div>
                    </div>
                }
            />
        );
    });
    return <div style={{ backgroundColor: '#363A43' }}>{tab_heads}</div>;
}

/**
 * @typedef Tab
 * @property {string} id
 * @property {*} icon
 * @property {string} title
 * @property {any} header
 */
