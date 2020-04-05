import * as React from 'react';
import MUICircularProgress from '@material-ui/core/CircularProgress';
/**
 * @extends {React.Component<CircularProgressProps>}
 */
class CircularProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <MUICircularProgress/>
        );
    }
}
export default CircularProgress;
/**
 * @typedef {any} CircularProgressProps
 */