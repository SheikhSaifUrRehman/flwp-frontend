import React, { useContext, useEffect, useState } from 'react';
import { Typography, AppBar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import { VideoCallContext } from '../../contexts/videoCallContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const Index = () => {
  const classes = useStyles();

  const { isCalling } = useContext(VideoCallContext);

  return (
    <div
      className={classes.wrapper}
      style={{
        display: isCalling ? 'flex' : 'none',
      }}
    >
      <AppBar
        className={classes.appBar}
        position='static'
        color='inherit'
      >
        <Typography variant='h3' align='center'>
          Video Chat
        </Typography>
      </AppBar>
      <Notifications />

      <Box
        display='flex'
        justifyConten='space-around'
        alignItems='center'
        flexWrap='wrap'
      >
        <VideoPlayer />
        {/* <Sidebar>
        </Sidebar> */}
      </Box>
    </div>
  );
};

export default Index;
