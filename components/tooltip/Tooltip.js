import * as React from 'react';
import MUITooltip from '@material-ui/core/Tooltip';
import { Fade } from '@material-ui/core';
/**
 * @extends {React.Component<TooltipProps>}
 */
class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let { tooltip, placement } = this.props;
        let ComponentWrapper = WrapComponent(this.props.children);
        return (
            <div>
                <MUITooltip
                    title={tooltip}
                    interactive
                    TransitionComponent={Fade}
                    placement={placement}
                >
                    <ComponentWrapper />
                </MUITooltip>
            </div>
        );
    }
}
export default Tooltip;
/**
 * @typedef TooltipProps
 * @property {JSX.Element | strin } [tooltip]
 * @property {'top' | 'bottom' | 'left' | 'right'} [placement]
 * @property {*} children
 */

function WrapComponent(Component) {
    const ComponentWrapper = React.forwardRef(function MyComponent(props, ref) {
        return <div {...props} ref={ref}>
            {Component}
        </div>
    });
    return ComponentWrapper;
}
