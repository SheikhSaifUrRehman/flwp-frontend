import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { SocketContext } from './socketContext';
import { useSelector, useDispatch } from 'react-redux';

import ringtone from '../assets/ringtone.mp3';
// import ringtone from '../assets/ringtone2.mp3';

const VideoCallContext = createContext();

// const socket = io('http://localhost:5000');

const VideoCallProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);
  let loggedUser = useSelector((state) => state.user.user);

  const [isCalling, setIsCalling] = useState(false);

  const toggleCalling = () => {
    setIsCalling((st) => !st);
  };

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const setMyVideoCurrent = (current) => {
    console.log(`myVideo.current`, myVideo.current);
    // if (!myVideo.current) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });
  };

  const playRingtone = () => {
    for (let i = 0; i < 10; i++) {
      if (i === 0) {
        audio.play();
      } else {
        setTimeout(() => {
          audio.play();
        }, 4000);
      }
    }
  };

  // useEffect(() => {}, []);
  const [audio] = useState(new Audio(ringtone));
  useEffect(() => {
    if (!socket) return;

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name, signal, receiverId }) => {
      console.log('************');
      console.log(`${from.name} is Calling`);
      console.log(`receiverId`, receiverId);
      console.log(`loggedUser._id`, loggedUser._id);
      console.log('************');

      if (
        !receiverId ||
        JSON.stringify(receiverId) !== JSON.stringify(loggedUser._id)
      )
        return;

      console.log('Hurrahhhhhhhhhhhhhh');
      playRingtone();
      setIsCalling(true);
      setCall({
        isReceivingCall: true,
        from,
        name,
        signal,
      });
    });
  }, [socket, loggedUser]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      console.log('EMITING AnserCall to', call.from);
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      // console.clear();
      console.log('PEER got signal');
      console.log(`loggedUser`, loggedUser);
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: loggedUser,
        name: loggedUser.name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (data) => {
      setCallAccepted(true);

      peer.signal(data.signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <VideoCallContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        setMyVideoCurrent,
        isCalling,
        setIsCalling,
        toggleCalling,
      }}
    >
      {children}
    </VideoCallContext.Provider>
  );
};

export { VideoCallProvider, VideoCallContext };
