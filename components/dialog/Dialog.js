import MUIDialog from '@material-ui/core/Dialog/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MUIDialogTitle from '@material-ui/core/DialogTitle';
import MUIDialogContent from '@material-ui/core/DialogContent';
import MUIDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import DialogActionsButton from '../../components/dialog/Dialog'
import { Button, CloseButton } from '../button/index';
import { externalClasses } from '../../theme/override';

const DialogTitle = props => {
    const { children, classes, onClose, ...other } = props;
    return (<div style={{ display: 'flex' }}>
        <MUIDialogTitle disableTypography {...other} style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '16px 24px 0px 24px' }}>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                <Typography variant="h6" style={{ flex: '1' }}>{children}</Typography>
            </div>
            <CloseButton onClick={onClose.bind(this)}/>
        </MUIDialogTitle>
    </div>
    );
}

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MUIDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MUIDialogActions);
/** @type {Object<string, React.CSSProperties>} */
const styles = {
    dialogPaper: {
        maxHeight: '80vh',
        minWidth: '70vw',
        maxWidth: '70vw',
    },
};
/**
 * 
 * @param {{open: boolean}} props 
 */
let DialogContainer = (props => (
    <MUIDialog {...props} classes={{ paper: `${props.classes.dialogPaper} ${externalClasses.mui.dialogPaper}` }}></MUIDialog>
));
DialogContainer = withStyles(styles)(DialogContainer);
/**
 * @extends {React.Component<{open: boolean, title: string, onClose: function},{}>}
 */
class Dialog extends React.Component {
    render() {
        let { title = '', onClose = (() => {}) } = this.props;
        return (
            <DialogContainer open={this.props.open || false} >
                <DialogTitle id="customized-dialog-title" onClose={onClose}>
                    {title}
                </DialogTitle>
                <div style={{ flexGrow: 1, padding: '0px 30px 0px 30px', overflow: 'auto' }}>
                    {this.props.children}
                </div>
            </DialogContainer>
        );
    }
}
export default Dialog;