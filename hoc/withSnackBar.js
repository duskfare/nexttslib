import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
export function withSnackbar(Component) {
  return (props) => {
    const [open, setOpen] = useState(false);
    /** @type { {type: NotificationSeverity, message: string }} */
    let notificationInitialState = { type: 'info', message: '' };
    const [notification, setNotification] = useState(notificationInitialState);
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <React.Fragment>
        <Component
          {...props}
          notify={(type, message) => {
            setNotification({ type, message });
            setOpen(true);
          }}
        />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  };
}

/**
 * @typedef {'error' | 'success' | 'warning' | 'info'} NotificationSeverity
 */
/**
 * @typedef SnackBarProps
 * @property {function(NotificationSeverity, string): *} notify
 */
