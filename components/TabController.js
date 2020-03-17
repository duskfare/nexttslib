import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
export class TabController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tab: null
        };
    }
    render() {
        let { tabs } = this.props;
        let active_tab = this.getActiveTab();
        let tab_heads = tabs.map((tab, idx) => {
            let activeClass = tab.id === active_tab.id ? 'tab-active' : '';
            return (
                <button
                    className={`${activeClass} no-outline subtle`}
                    key={idx}
                    onClick={() => this.activateTab(tab)}>
                    {tab.header}
                </button>
            );
        });
        let active_tab_element = this.getActiveTabElement();
        return <div className="h-100 m-0" style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ backgroundColor: '#363A43' }}>
                {tab_heads}
            </div>
            <div
                className="w-100"
                style={{ backgroundColor: '#363A43', flex: '1', margin: 'auto' }}>
                <div className="h-100" style={{ display: 'flex' }}>
                    {active_tab_element}
                </div>
            </div>
            {/* <div className="container m-0 w-100">
                <Row>
                    <Col xs={12}>
                    </Col>
                </Row>
                <Row style={{ flex: 1 }}>
                    <Col xs={12}>
                    </Col>
                </Row>
            </div> */}
        </div>
    }

    activateTab(tab) {
        let { onTabClicked = () => { } } = this.props;
        this.setState({ active_tab: tab });
        onTabClicked(tab);
    }

    getActiveTab() {
        let { active_tab } = this.state;
        let { tabs } = this.props;
        if (!active_tab) {
            active_tab = tabs[0] || {};
        }
        return active_tab;
    }
    getActiveTabElement() {
        let { tabs, active_tab_id: active_tab_id_override } = this.props;
        let active_tab = this.getActiveTab();
        let active_tab_override = active_tab_id_override ? tabs.reduce((selected, tab, idx) => {
            if (!selected) {
                if (tab.id === active_tab_id_override) {
                    selected = tab;
                }
            }
            return selected;
        }, null) : null;

        active_tab = active_tab_override || active_tab;
        return active_tab.content;
    }
}
export default TabController;