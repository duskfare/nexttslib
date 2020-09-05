import MUIDialog from '@material-ui/core/Dialog/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MUIDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { CloseButton } from '../button/index';
import { externalClasses } from '../../theme/override';

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <div style={{ display: 'flex' }}>
      <MUIDialogTitle
        disableTypography
        {...other}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          padding: '16px 24px 0px 24px',
        }}
      >
        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <Typography variant="h6" style={{ flex: '1' }}>
            {children}
          </Typography>
        </div>
        <CloseButton onClick={onClose.bind(this)} />
      </MUIDialogTitle>
    </div>
  );
};

/** @type {*} */
const styles = {
  dialogPaper: {
    maxHeight: '80vh',
    minWidth: '70vw',
    maxWidth: '70vw',
  },
};
/**
 *
 * @param {*} props
 */
let DialogContainerInner = (props) => (
  <MUIDialog
    {...props}
    classes={{
      paper: `${props.classes.dialogPaper} ${externalClasses.mui.dialogPaper}`,
    }}
  ></MUIDialog>
);
let DialogContainer = withStyles(styles)(DialogContainerInner);
/**
 * @extends {React.Component<DialogProps>}
 */
class Dialog extends React.Component {
  render() {
    let { title = '', onClose = () => {} } = this.props;
    return (
      <DialogContainer open={this.props.open || false}>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
        </DialogTitle>
        <div
          style={{
            flexGrow: 1,
            padding: '0px 30px 0px 30px',
            overflow: 'auto',
          }}
        >
          {this.props.children}
        </div>
      </DialogContainer>
    );
  }
}
export default Dialog;

/**
 * @typedef DialogProps
 * @property {boolean} open
 * @property {string} title
 * @property {function} onClose
 */
