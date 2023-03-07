import React, { useContext, useEffect } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import { VideoCallContext } from '../../contexts/videoCallContext';
import { useSelector, useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  video: {
    width: '500px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const {
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    setMyVideoCurrent,
  } = useContext(VideoCallContext);
  const classes = useStyles();
  let loggedUser = useSelector((state) => state.user.user);

  useEffect(() => {
    setMyVideoCurrent();
  }, []);

  console.log(`userVideo`, userVideo);
  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' gutterBottom>
              {loggedUser && loggedUser.name}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' gutterBottom>
              {call.name || 'Name'}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
