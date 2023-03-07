import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import AddBid from '../pages/AddBid';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((props) => ({
  Dialog: {
    '& .MuiDialog-paper': {
      minHeight: props.role === 'Task' && 450,
    },
  },
  addBtn: {},
  cancelBtn: {},
}));

const initialStageState = {
  name: '',
  description: '',
};

const AddBidDialog = (props) => {
  const { isOpen, closeDialog } = props;
  const classes = useStyles(props);

  const handleSubmit = () => {};

  const handleClose = () => {
    closeDialog();
  };

  return (
    <div>
      <Dialog
        className={classes.Dialog}
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle
          id='form-dialog-title'
          style={{
            background: '#1890FF',
            color: '#fff',
            position: 'relative',
          }}
        >
          Add User Request
          <Button
            startIcon={<CloseIcon />}
            onClick={closeDialog}
            size='large'
            style={{
              color: 'rgb(255, 255, 255)',
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          ></Button>
        </DialogTitle>
        <DialogContent>
          <AddBid closeDialog={closeDialog} />
        </DialogContent>
        {/* <DialogActions>
          <Button
            onClick={handleSubmit}
            variant='contained'
            color='primary'
          >
            Create
          </Button>
          <Button
            onClick={handleClose}
            variant='contained'
            color='error'
          >
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default AddBidDialog;
