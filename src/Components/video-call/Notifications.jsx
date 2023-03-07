import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';

import { SocketContext } from '../../contexts/socketContext';
import { VideoCallContext } from '../../contexts/videoCallContext';
import { PhoneDisabled } from '@material-ui/icons';

const Notifications = () => {
  const { answerCall, call, callAccepted, callEnded, leaveCall } =
    useContext(VideoCallContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <Typography variant='h4'>
            {call.name} is calling:
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={answerCall}
          >
            Answer
          </Button>
        </div>
      )}
      {callAccepted && !callEnded && (
        <Button
          variant='contained'
          color='error'
          startIcon={<PhoneDisabled fontSize='large' />}
          onClick={leaveCall}
        >
          Hang Up
        </Button>
      )}
    </>
  );
};

export default Notifications;
